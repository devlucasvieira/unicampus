import { Curso } from "./Curso";
import {Usuario} from "./Usuario";

export enum StatusAluno {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    RASCUNHO = 'RASCUNHO'
}

export type FiltroAluno = {
    unidadeOriginaria?: string;

    nome?: string;

    status?: 'A' | 'I' | 'T';

    pagina?: number;

    tamanhoPagina?: number;
}

export type FiltroHistoricoAluno = {
    usuario?: string;

    tipoOperacao?: TipoOperacao;

    dataInicio?: Date;

    dataTermino?: Date;

    pagina?: number;

    tamanhoPagina?: number;
}

export type Aluno = {

    id?: number;

    nome: string;

    dataNascimento: Date | null; 

    status?: StatusAluno | null;

    curso: string | null;
}

export enum TipoOperacao {
    INCLUSAO = 'INCLUSAO',
    ALTERACAO = 'ALTERACAO',
    EXCLUSAO = 'EXCLUSAO'
}

export type HistoricoAluno = {
    id: number;

    dataOperacao: Date;

    tipoOperacao: TipoOperacao;

    enderecoIp: string;

    usuario: Usuario;

    nome: string;

    status?: StatusAluno;

    dataNascimento: Date;
}