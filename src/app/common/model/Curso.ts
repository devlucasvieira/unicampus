import {Usuario} from "./Usuario";

export enum StatusCurso {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    RASCUNHO = 'RASCUNHO'
}

export type FiltroCurso = {

    nome?: string;

    status?: 'A' | 'I' | 'T';

    pagina?: number;

    tamanhoPagina?: number;
}

export type FiltroHistoricoCurso = {
    usuario?: string;

    tipoOperacao?: TipoOperacao;

    dataInicio?: Date;

    dataTermino?: Date;

    pagina?: number;

    tamanhoPagina?: number;
}

export type Curso = {

    id?: number;

    nome: string;

    descricao: string;

    status?: StatusCurso | null;

}

export enum TipoOperacao {
    INCLUSAO = 'INCLUSAO',
    ALTERACAO = 'ALTERACAO',
    EXCLUSAO = 'EXCLUSAO'
}

export type HistoricoCurso = {
    id: number;

    dataOperacao: Date;

    tipoOperacao: TipoOperacao;

    enderecoIp: string;

    usuario: Usuario;

    nome: string;

    descricao: string;

    status?: StatusCurso;

}