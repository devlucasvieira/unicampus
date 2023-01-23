import {Usuario} from "./Usuario";

export enum StatusProfessor {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    RASCUNHO = 'RASCUNHO'
}

export type FiltroProfessor = {
    unidadeOriginaria?: string;

    nome?: string;

    status?: 'A' | 'I' | 'T';

    pagina?: number;

    tamanhoPagina?: number;
}

export type FiltroHistoricoProfessor = {
    usuario?: string;

    tipoOperacao?: TipoOperacao;

    dataInicio?: Date;

    dataTermino?: Date;

    pagina?: number;

    tamanhoPagina?: number;
}

export type Professor = {

    id?: number;

    nome: string;

    dataNascimento: Date | null; 

    status?: StatusProfessor | null;

    disciplina: string | null;

    salario?: number;
}

export enum TipoOperacao {
    INCLUSAO = 'INCLUSAO',
    ALTERACAO = 'ALTERACAO',
    EXCLUSAO = 'EXCLUSAO'
}

export type HistoricoProfessor = {
    id: number;

    dataOperacao: Date;

    tipoOperacao: TipoOperacao;

    enderecoIp: string;

    usuario: Usuario;

    nome: string;

    status?: StatusProfessor;

    dataNascimento: Date;
}