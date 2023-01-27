import { useFormik } from "formik";
import * as Yup from "yup";
import message from "../../common/message/AppMessage.json";
import { useHttpClient } from "../../common/hooks/useHttpClient";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUtil } from "../../common/hooks/useUtil";
import { confirmDialog } from "primereact/confirmdialog";
import { FiltroCurso, Curso, StatusCurso } from "../../common/model/Curso";
import { useExport } from "../../common/hooks/useExport";
import { useString } from "../../common/hooks/useString";
import cursosData from "../../../assets/data/cursos.json";

export const useCurso = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useRef(null);
    const { isFormFieldValid, classNames, showMessage } = useUtil();
    const { httpGet, httpDelete, isLoading, error } = useHttpClient<Curso>();
    const [cursos, setCursos] = useState([] as any);
    const { exportExcel, exportPdf } = useExport();
    const { containsNormalized } = useString();
    const filtroAnterior = location.state as any;

    const formFiltro = useFormik<FiltroCurso>({
        initialValues: {},
        onSubmit: (values) => {
            consultaCursos(values);
        },
        onReset: (_) => {
            setCursos(undefined);
            navigate("/curso/lista");
        },
    });
    const formCadastro = useFormik<Curso>({
        initialValues: {
            nome: "",
            descricao: "",
            status: StatusCurso.RASCUNHO,
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
            salvarCurso(values);
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

    const carregarCurso = useCallback(() => {

        if (id) {

            let data: any = {
                id: 1,
                nome: "Engenharia de Software",
                descricao: "O curso de Engenharia de Software prepara profissionais",
                status: StatusCurso.ATIVO,
            };
            setValues({...data || undefined});
            console.log(data)
            
        }
    }, [id, httpGet, onError, setValues]);

    const mapExportColumns = (s: Curso) => ({
        "Nome do Curso": s.nome,
        Descrição: s.descricao,
        Situação: s.status,
    });

    const onExportExcel = () => {
        if (cursos) {
            exportExcel(cursos.map(mapExportColumns), "Cursos");
        }
    };

    const onExportPdf = () => {
        if (cursos) {
            exportPdf(cursos.map(mapExportColumns), "Cursos");
        }
    };

    const matchFiltro = (filtro: FiltroCurso, s: any) => {
        if (!!filtro.nome && !containsNormalized(s.nome, filtro.nome)) {
            return false;
        }

        if (filtro.status !== "T") {
            if (filtro.status === "I") {
                if (s.status !== StatusCurso.INATIVO) {
                    return false;
                }
            } else if (s.status !== StatusCurso.ATIVO) {
                return false;
            }
        }

        return true;
    };

    const consultaCursos = useCallback(
        (filtro: FiltroCurso) => {
            setCursos(cursosData?.data);
        },
        [setCursos]
    );

    const salvarCurso = (curso: Curso) => {
        let data: any = {};
        Object.assign(data, curso);

        onSuccess();

        setTimeout(() => {
            onVoltar();
        }, 2000);
    };

    const stats = [
        { value: StatusCurso.ATIVO, label: StatusCurso.ATIVO },
        { value: StatusCurso.INATIVO, label: StatusCurso.INATIVO },
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

    const onHistorico = (idCurso: number) => {
        navigate(`/historico-curso/${idCurso}`, {
            state: { filtroCurso: formFiltro.values },
        });
    };

    const onDetalhar = (idCurso: number) => {
        navigate(`/curso/detalhe/${idCurso}`, { state: formFiltro.values });
    };

    const onDetalharExclusao = (curso: any) => {
        if (curso.status === StatusCurso.ATIVO) {
            navigate(`/curso/exclusao/${curso}`, { state: formFiltro.values });
        } else {
            showMessage(toast, message.MN010, "error");
        }
    };

    const onExcluir = (curso: Curso) => {
        confirmDialog({
            message: `A exclusão desse Curso poderá impactar em consultas futuras.\n\nDeseja prosseguir com a exclusão?`,
            header: "Confirmacao de Exclusão",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Confirmar",
            accept() {
                httpDelete(`/cursos/${curso.id}`)
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
        carregarCurso();
    }, [carregarCurso]);

    useEffect(() => {
        if (filtroAnterior) {
            formFiltro.setValues(filtroAnterior);
            if (!id) {
                consultaCursos(filtroAnterior);
            }
        }
    }, [consultaCursos, filtroAnterior, formFiltro, id]);

    return {
        formCadastro,
        onCadastrar,
        onVoltar,
        formFiltro,
        stats,
        isLoading,
        error,
        toast,
        consultaCursos,
        isFormFieldValid,
        classNames,
        cursos,
        onEditar,
        onExcluir,
        onHistorico,
        onDetalhar,
        onDetalharExclusao,
        onExportExcel,
        onExportPdf,
    };
};
