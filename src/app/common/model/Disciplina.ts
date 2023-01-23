import {Usuario} from "./Usuario";

export enum StatusDisciplina {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    RASCUNHO = 'RASCUNHO'
}

export enum GrupoDisciplina {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO'
}

export enum TipoPessoa {
    FISICA = 'Pessoa Física',
    JURIDICA = 'Pessoa Jurídica'
}

export type FiltroDisciplina = {
    unidadeOriginaria?: string;

    nome?: string;

    status?: 'A' | 'I' | 'T';

    pagina?: number;

    tamanhoPagina?: number;
}

export type FiltroHistoricoDisciplina = {
    usuario?: string;

    tipoOperacao?: TipoOperacao;

    dataInicio?: Date;

    dataTermino?: Date;

    pagina?: number;

    tamanhoPagina?: number;
}

export type Disciplina = {

    id?: number;

    unidadeOriginaria?: string;

    nome: string;

    descricao: string;

    icone?: string;

    cursoLegado?: boolean;

    omitirNaAreaTrabalhoTesouro?: boolean;

    enderecoIntegracao?: string;

    enderecoHomologacao?: string;

    enderecoProducao?: string;

    status?: StatusDisciplina | null;

    grupoDisciplina?: GrupoDisciplina;

    tipoPessoa?: TipoPessoa;
}

export enum TipoOperacao {
    INCLUSAO = 'INCLUSAO',
    ALTERACAO = 'ALTERACAO',
    EXCLUSAO = 'EXCLUSAO'
}

export type HistoricoDisciplina = {
    id: number;

    dataOperacao: Date;

    tipoOperacao: TipoOperacao;

    enderecoIp: string;

    usuario: Usuario;

    unidadeOriginaria: string;

    nome: string;

    descricao: string;

    icone: string;

    cursoLegado: boolean;

    omitirNaAreaTrabalhoTesouro: boolean;

    enderecoIntegracao?: string;

    enderecoHomologacao: string;

    enderecoProducao: string;

    status?: StatusDisciplina;

}