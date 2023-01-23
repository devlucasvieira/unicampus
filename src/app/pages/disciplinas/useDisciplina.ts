import {useFormik} from "formik";
import * as Yup from 'yup';
import message from "../../common/message/AppMessage.json";
import {useHttpClient} from "../../common/hooks/useHttpClient";
import {useCallback, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useUtil} from "../../common/hooks/useUtil";
import {confirmDialog} from 'primereact/confirmdialog';
import {FiltroDisciplina, Disciplina, StatusDisciplina} from "../../common/model/Disciplina";
import {useFile} from "../../common/hooks/useFile";
import {useExport} from "../../common/hooks/useExport";
import {useString} from "../../common/hooks/useString";
import disciplinasData from "../../../assets/data/disciplinas.json";

export const useDisciplina = () => {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {toBase64, checkImageSize} = useFile();
    const toast = useRef(null);
    const {isFormFieldValid, classNames, showMessage} = useUtil();
    const {httpGet, httpDelete, isLoading, error} = useHttpClient<Disciplina>();
    const [disciplinas, setDisciplinas] = useState([] as any);
    const {exportExcel, exportPdf} = useExport();
    const {containsNormalized, compareNormalized} = useString();
    const filtroAnterior = location.state as any;

    const descricaoStatus = {
        [StatusDisciplina.ATIVO]: 'Ativo',
        [StatusDisciplina.INATIVO]: 'Inativo',
        [StatusDisciplina.RASCUNHO]: 'Rascunho'
    };

    const formFiltro = useFormik<FiltroDisciplina>({
        initialValues: {},
        onSubmit: values => {
            consultaDisciplinas(values);
        },
        onReset: _ => {
            setDisciplinas(undefined);
            navigate('/disciplina/lista');
        }
    });
    const formCadastro = useFormik<Disciplina>({
        initialValues: {
            nome: '',
            descricao: '',
            status: StatusDisciplina.RASCUNHO
        },
        validationSchema: Yup.object().shape({
            nome: Yup.string()
                .max(150, message.MA001)
                .required(message.MN001),
            descricao: Yup.string()
                .max(500, message.MA001)
                .nullable()
                .required(message.MN001),
            status: Yup.string()
                .required(message.MN001),
        }),
        onSubmit: values => {
            salvarDisciplina(values);
        },
        onReset: _ => {
            navigate('/disciplina/cadastro');
        }
    });

    const {setValues} = formCadastro;

    const onSuccess = useCallback((): void => {
        showMessage(toast, message.MN014, "success");
    }, [showMessage, toast]);

    const onError = useCallback((): void => {
        showMessage(toast, message.MN015, "error");
    }, [showMessage, toast]);

    const carregarDisciplina = useCallback(() => {
        if (id) {
            httpGet(`/disciplinas/${id}`)
                .then((s: any) => {
                    setValues({...s, enderecoIntegracao: s.enderecoIntegracao || undefined});
                })
                .catch(_ => onError());
        }
    }, [id, httpGet, onError, setValues]);

    const iconeUploadHandler = async (event: any) => {
        const [file] = event.target.files;

        const base64 = await toBase64(file);

        const valid = await checkImageSize(base64, 64, 64);

        if (!valid) {
            showMessage(toast, message.MN007, "error");
            return;
        }

        formCadastro.values.icone = base64;
        event.target.value = '';
        formCadastro.handleChange(event);
    };

    const mapExportColumns = (s: any) => ({
        'Nome da Disciplina': s?.name,
        'Descrição': s?.description,
        'Situação': s.status
    });

    const onExportExcel = () => {
        if (disciplinas) {
            exportExcel(disciplinas.map(mapExportColumns), 'Disciplinas');
        }
    }

    const onExportPdf = () => {
        if (disciplinas) {
            exportPdf(disciplinas.map(mapExportColumns), 'Disciplinas');
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const matchFiltro = (filtro: FiltroDisciplina, s: Disciplina) => {
        if (!!filtro.nome && !containsNormalized(s.nome, filtro.nome)) {
            return false;
        }

        if (filtro.status !== 'T') {
            if (filtro.status === 'I') {
                if (s.status !== StatusDisciplina.INATIVO) {
                    return false;
                }
            } else if (s.status !== StatusDisciplina.ATIVO) {
                return false;
            }
        }

        return true;
    };

    const consultaDisciplinas = useCallback((filtro: FiltroDisciplina) => {
        setDisciplinas(disciplinasData?.data);
    }, [httpGet, compareNormalized, matchFiltro, onError]);

    const salvarDisciplina = (disciplina: Disciplina) => {

        let data: any = {};
        Object.assign(data, disciplina);
        
        onSuccess();
        
        setTimeout(() => {
            onVoltar();
        }, 2000);

    }

    const stats = [
        {value: StatusDisciplina.ATIVO, label: StatusDisciplina.ATIVO},
        {value: StatusDisciplina.INATIVO, label: StatusDisciplina.INATIVO}
    ];

    const onVoltar = () => {
        navigate(`/disciplina/lista`, {state: filtroAnterior});
    }

    const onCadastrar = () => {
        navigate(`/disciplina/cadastro`);
    }

    const onEditar = (disciplina: any) => {
        navigate(`/disciplina/edicao/${disciplina.id}`, {state: formFiltro.values});
    }

    const onHistorico = (idDisciplina: number) => {
        navigate(`/historico-disciplina/${idDisciplina}`, {state: {filtroDisciplina: formFiltro.values}});
    }

    const onDetalhar = (idDisciplina: number) => {
        navigate(`/disciplina/detalhe/${idDisciplina}`, {state: formFiltro.values});
    }

    const onDetalharExclusao = (disciplina: any) => {
        if (disciplina.status === StatusDisciplina.ATIVO) {
            navigate(`/disciplina/exclusao/${disciplina.id}`, {state: formFiltro.values});
        } else {
            showMessage(toast, message.MN010, "error");
        }
    }

    const onExcluir = (disciplina: Disciplina) => {
        confirmDialog({
            message: `A exclusão desse Disciplina poderá impactar em consultas futuras.\n\nDeseja prosseguir com a exclusão?`,
            header: 'Confirmacao de Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Confirmar',
            accept() {
                httpDelete(`/disciplinas/${disciplina.id}`)
                    .then(() => {
                        onVoltar();
                        showMessage(toast, message.MN003, 'success');
                    })
                    .catch(() => showMessage(toast, message.MN004, 'error'))
            },
            rejectLabel: 'Voltar'
        });

    }

    useEffect(() => {
        carregarDisciplina();
    }, [carregarDisciplina]);

    useEffect(() => {
        if (filtroAnterior) {
            formFiltro.setValues(filtroAnterior);
            if (!id) {
                consultaDisciplinas(filtroAnterior);
            }
        }
    }, [consultaDisciplinas, filtroAnterior, formFiltro, id]);

    return {
        formCadastro,
        onCadastrar,
        onVoltar,
        formFiltro,
        stats,
        isLoading,
        error,
        toast,
        consultaDisciplinas,
        isFormFieldValid,
        classNames,
        disciplinas,
        onEditar,
        onExcluir,
        onHistorico,
        onDetalhar,
        onDetalharExclusao,
        iconeUploadHandler,
        onExportExcel,
        onExportPdf,
        descricaoStatus
    };
}