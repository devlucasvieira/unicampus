import { Router } from "../../common/model/Router";
import { DisciplinaListar } from "./DisciplinaListar";
import { DisciplinaCadastro } from "./DisciplinaCadastro";
import { DisciplinaDetalhe } from "./DisciplinaDetalhe";
import { DisciplinaExclusao } from "./DisciplinaExclusao";

export const DisciplinaRouter: Router[] = [
    {path: 'disciplina/lista', component: <DisciplinaListar/>, authenticated: false},
    {path: 'disciplina/cadastro', component: <DisciplinaCadastro/>, authenticated: false},
    {path: 'disciplina/detalhe/:id', component: <DisciplinaDetalhe/>, authenticated: false},
    {path: 'disciplina/exclusao/:id', component: <DisciplinaExclusao/>, authenticated: false},
    {path: 'disciplina/edicao/:id', component: <DisciplinaCadastro/>, authenticated: false},
]