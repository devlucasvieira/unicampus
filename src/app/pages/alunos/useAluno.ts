import { useFormik } from "formik";
import * as Yup from "yup";
import message from "../../common/message/AppMessage.json";
import { useHttpClient } from "../../common/hooks/useHttpClient";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUtil } from "../../common/hooks/useUtil";
import { confirmDialog } from "primereact/confirmdialog";
import { FiltroAluno, Aluno, StatusAluno } from "../../common/model/Aluno";
import { useExport } from "../../common/hooks/useExport";
import { useString } from "../../common/hooks/useString";
import alunosData from "../../../assets/data/alunos.json";

export const useAluno = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useRef(null);
    const { isFormFieldValid, classNames, showMessage } = useUtil();
    const { httpDelete, isLoading, error } = useHttpClient<Aluno>();
    const [alunos, setAlunos] = useState([] as any);
    const { exportExcel, exportPdf } = useExport();
    const { containsNormalized } = useString();
    const filtroAnterior = location.state as any;

    const formFiltro = useFormik<FiltroAluno>({
        initialValues: {},
        onSubmit: (values) => {
            consultaAlunos(values);
        },
        onReset: (_) => {
            setAlunos(undefined);
            navigate("/curso/lista");
        },
    });
    const formCadastro = useFormik<Aluno>({
        initialValues: {
            nome: "",
            dataNascimento: null,
            status: StatusAluno.ATIVO,
            curso: null
        },
        validationSchema: Yup.object().shape({
            nome: Yup.string().max(150, message.MA001).required(message.MN001),
            descricao: Yup.string()
                .max(500, message.MA001)
                .nullable()
                .required(message.MN001),
            status: Yup.string().required(message.MN001),
        }),
        onSubmit: (values) => {
            salvarAluno(values);
        },
        onReset: (_) => {
            navigate("/curso/cadastro");
        },
    });

    const { setValues } = formCadastro;

    const onSuccess = useCallback((): void => {
        showMessage(toast, message.MN012, "success");
    }, [showMessage, toast]);

    const onError = useCallback((): void => {
        showMessage(toast, message.MN013, "error");
    }, [showMessage, toast]);

    const carregarAluno = useCallback(() => {

        if (id) {

            let data: any = {
                id: 1,
                nome: "Engenharia de Software",
                descricao: "O curso de Engenharia de Software prepara profissionais focados no desenvolvimento de novos programas de computador. Ao concluir o curso, o profissional poderá projetar, testar e fazer manutenção de softwares, sistemas, jogos, aplicativos e plataformas digitais.O uso massivo de celulares e tablets pela população brasileira é um dos motivos pelos quais profissionais habilitados para lidar com essa tecnologia sejam tão requisitados. No mercado de trabalho, a área de atuação que se destaca é a de Tecnologia da Informação, desenvolvendo softwares para empresas ou projetos com financiamento próprio ou sob demanda para clientes isolados.                Os tipos de formação para o curso de Engenharia de Software são: bacharelado e pós-graduação.",
                status: StatusAluno.ATIVO,
            };
    
            setValues(data);
        }
    }, [id, setValues]);

    const mapExportColumns = (s: Aluno) => ({
        "Nome do Aluno": s.nome,
        "Data Nascimento": s.dataNascimento,
        "Situação": s.status,
    });

    const onExportExcel = () => {
        if (alunos) {
            exportExcel(alunos.map(mapExportColumns), "Alunos");
        }
    };

    const onExportPdf = () => {
        if (alunos) {
            exportPdf(alunos.map(mapExportColumns), "Alunos");
        }
    };

    const matchFiltro = (filtro: FiltroAluno, s: any) => {
        if (!!filtro.nome && !containsNormalized(s.nome, filtro.nome)) {
            return false;
        }

        if (filtro.status !== "T") {
            if (filtro.status === "I") {
                if (s.status !== StatusAluno.INATIVO) {
                    return false;
                }
            } else if (s.status !== StatusAluno.ATIVO) {
                return false;
            }
        }

        return true;
    };

    const consultaAlunos = useCallback(
        (filtro: FiltroAluno) => {
            setAlunos(alunosData?.data);
        },
        [setAlunos]
    );

    const salvarAluno = (aluno: Aluno) => {
        let data: any = {};
        Object.assign(data, aluno);

        onSuccess();

        setTimeout(() => {
            onVoltar();
        }, 2000);

    };

    const stats = [
        { value: StatusAluno.ATIVO, label: StatusAluno.ATIVO },
        { value: StatusAluno.INATIVO, label: StatusAluno.INATIVO },
    ];

    const onVoltar = () => {
        navigate(`/curso/lista`, { state: filtroAnterior });
    };

    const onCadastrar = () => {
        navigate(`/curso/cadastro`);
    };

    const onEditar = (curso: any) => {
        navigate(`/curso/edicao/${curso}`, { state: formFiltro.values });
    };

    const onHistorico = (idAluno: number) => {
        navigate(`/historico-curso/${idAluno}`, {
            state: { filtroAluno: formFiltro.values },
        });
    };

    const onDetalhar = (idAluno: number) => {
        navigate(`/curso/detalhe/${idAluno}`, { state: formFiltro.values });
    };

    const onDetalharExclusao = (curso: any) => {
        if (curso.status === StatusAluno.ATIVO) {
            navigate(`/curso/exclusao/${curso}`, { state: formFiltro.values });
        } else {
            showMessage(toast, message.MN010, "error");
        }
    };

    const onExcluir = (curso: Aluno) => {
        confirmDialog({
            message: `A exclusão desse Aluno poderá impactar em consultas futuras.\n\nDeseja prosseguir com a exclusão?`,
            header: "Confirmacao de Exclusão",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Confirmar",
            accept() {
                httpDelete(`/alunos/${curso.id}`)
                    .then(() => {
                        onVoltar();
                        showMessage(toast, message.MN003, "success");
                    })
                    .catch(() => showMessage(toast, message.MN004, "error"));
            },
            rejectLabel: "Voltar",
        });
    };

    useEffect(() => {
        carregarAluno();
    }, [carregarAluno]);

    useEffect(() => {
        if (filtroAnterior) {
            formFiltro.setValues(filtroAnterior);
            if (!id) {
                consultaAlunos(filtroAnterior);
            }
        }
    }, [consultaAlunos, filtroAnterior, formFiltro, id]);

    return {
        formCadastro,
        onCadastrar,
        onVoltar,
        formFiltro,
        stats,
        isLoading,
        error,
        toast,
        consultaAlunos,
        isFormFieldValid,
        classNames,
        alunos,
        onEditar,
        onExcluir,
        onHistorico,
        onDetalhar,
        onDetalharExclusao,
        onExportExcel,
        onExportPdf,
    };
};
