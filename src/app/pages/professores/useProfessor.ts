import { useFormik } from "formik";
import * as Yup from "yup";
import message from "../../common/message/AppMessage.json";
import { useHttpClient } from "../../common/hooks/useHttpClient";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUtil } from "../../common/hooks/useUtil";
import { confirmDialog } from "primereact/confirmdialog";
import { FiltroProfessor, Professor, StatusProfessor } from "../../common/model/Professor";
import { useExport } from "../../common/hooks/useExport";
import { useString } from "../../common/hooks/useString";
import professoresData from "../../../assets/data/professores.json";

export const useProfessor = () => {

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useRef(null);
    const { isFormFieldValid, classNames, showMessage } = useUtil();
    const { httpDelete, isLoading, error } = useHttpClient<Professor>();
    const [professores, setProfessores] = useState([] as any);
    const { exportExcel, exportPdf } = useExport();
    const { containsNormalized } = useString();
    const filtroAnterior = location.state as any;

    const formFiltro = useFormik<FiltroProfessor>({
        initialValues: {},
        onSubmit: (values) => {
            consultaProfessors(values);
        },
        onReset: (_) => {
            setProfessores(undefined);
            navigate("/professor/lista");
        },
    });
    const formCadastro = useFormik<Professor>({
        initialValues: {
            nome: "",
            dataNascimento: null,
            status: StatusProfessor.ATIVO,
            disciplina: null,
            salario: undefined,
        },
        validationSchema: Yup.object().shape({
            nome: Yup.string().max(150, message.MA001).required(message.MN001),
            descricao: Yup.string()
                .max(500, message.MA001)
                .nullable()
                .required(message.MN001),
            status: Yup.string().required(message.MN001),
            dataNascimento: Yup.date().nullable().required(message.MN001),
            salario: Yup.string().required(message.MN001),
        }),
        onSubmit: (values) => {
            salvarProfessor(values);
        },
        onReset: (_) => {
            navigate("/professor/cadastro");
        },
    });

    const { setValues } = formCadastro;

    const onSuccess = useCallback((): void => {
        showMessage(toast, message.MN012, "success");
    }, [showMessage, toast]);

    const onError = useCallback((): void => {
        showMessage(toast, message.MN013, "error");
    }, [showMessage, toast]);

    const carregarProfessor = useCallback(() => {

        if (id) {

            let data: any = {
                id: 1,
                nome: "Engenharia de Software",
                descricao: "O professor de Engenharia de Software prepara profissionais focados no desenvolvimento de novos programas de computador. Ao concluir o professor, o profissional poderá projetar, testar e fazer manutenção de softwares, sistemas, jogos, aplicativos e plataformas digitais.O uso massivo de celulares e tablets pela população brasileira é um dos motivos pelos quais profissionais habilitados para lidar com essa tecnologia sejam tão requisitados. No mercado de trabalho, a área de atuação que se destaca é a de Tecnologia da Informação, desenvolvendo softwares para empresas ou projetos com financiamento próprio ou sob demanda para clientes isolados.                Os tipos de formação para o professor de Engenharia de Software são: bacharelado e pós-graduação.",
                status: StatusProfessor.ATIVO,
            };
    
            setValues(data);
        }
    }, [id, setValues]);

    const mapExportColumns = (s: Professor) => ({
        "Nome do Professor": s.nome,
        "Data Nascimento": s.dataNascimento,
        "Situação": s.status,
    });

    const onExportExcel = () => {
        if (professores) {
            exportExcel(professores.map(mapExportColumns), "Professors");
        }
    };

    const onExportPdf = () => {
        if (professores) {
            exportPdf(professores.map(mapExportColumns), "Professors");
        }
    };

    const matchFiltro = (filtro: FiltroProfessor, s: any) => {
        if (!!filtro.nome && !containsNormalized(s.nome, filtro.nome)) {
            return false;
        }

        if (filtro.status !== "T") {
            if (filtro.status === "I") {
                if (s.status !== StatusProfessor.INATIVO) {
                    return false;
                }
            } else if (s.status !== StatusProfessor.ATIVO) {
                return false;
            }
        }

        return true;
    };

    const consultaProfessors = useCallback(
        (filtro: FiltroProfessor) => {
            setProfessores(professoresData?.data);
        },
        [setProfessores]
    );

    const salvarProfessor = (aluno: Professor) => {
        let data: any = {};
        Object.assign(data, aluno);

        onSuccess();

        setTimeout(() => {
            onVoltar();
        }, 2000);

    };

    const stats = [
        { value: StatusProfessor.ATIVO, label: StatusProfessor.ATIVO },
        { value: StatusProfessor.INATIVO, label: StatusProfessor.INATIVO },
    ];

    const onVoltar = () => {
        navigate(`/professor/lista`, { state: filtroAnterior });
    };

    const onCadastrar = () => {
        navigate(`/professor/cadastro`);
    };

    const onEditar = (professor: any) => {
        navigate(`/professor/edicao/${professor}`, { state: formFiltro.values });
    };

    const onHistorico = (idProfessor: number) => {
        navigate(`/historico-professor/${idProfessor}`, {
            state: { filtroProfessor: formFiltro.values },
        });
    };

    const onDetalhar = (idProfessor: number) => {
        navigate(`/professor/detalhe/${idProfessor}`, { state: formFiltro.values });
    };

    const onDetalharExclusao = (professor: any) => {
        if (professor.status === StatusProfessor.ATIVO) {
            navigate(`/professor/exclusao/${professor}`, { state: formFiltro.values });
        } else {
            showMessage(toast, message.MN010, "error");
        }
    };

    const onExcluir = () => {
        confirmDialog({
            message: `A exclusão desse Professor poderá impactar em consultas futuras.\n\nDeseja prosseguir com a exclusão?`,
            header: "Confirmacao de Exclusão",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Confirmar",
            accept() {

                showMessage(toast, message.MN003, "success");
                setTimeout(() => {
                    onVoltar();
                }, 2000)
            },
            rejectLabel: "Voltar",
        });
    };

    useEffect(() => {
        carregarProfessor();
    }, [carregarProfessor]);

    useEffect(() => {
        if (filtroAnterior) {
            formFiltro.setValues(filtroAnterior);
            if (!id) {
                consultaProfessors(filtroAnterior);
            }
        }
    }, [consultaProfessors, filtroAnterior, formFiltro, id]);

    return {
        formCadastro,
        onCadastrar,
        onVoltar,
        formFiltro,
        stats,
        isLoading,
        error,
        toast,
        consultaProfessors,
        isFormFieldValid,
        classNames,
        professores,
        onEditar,
        onExcluir,
        onHistorico,
        onDetalhar,
        onDetalharExclusao,
        onExportExcel,
        onExportPdf,
    };
};
