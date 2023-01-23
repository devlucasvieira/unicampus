import { Router } from "../../common/model/Router";
import { ProfessorListar } from "./ProfessorListar";
import { ProfessorCadastro } from "./ProfessorCadastro";
import { ProfessorDetalhe } from "./ProfessorDetalhe";
import { ProfessorExclusao } from "./ProfessorExclusao";

export const ProfessorRouter: Router[] = [
    {path: 'professor/lista', component: <ProfessorListar/>, authenticated: false},
    {path: 'professor/cadastro', component: <ProfessorCadastro/>, authenticated: false},
    {path: 'professor/detalhe/:id', component: <ProfessorDetalhe/>, authenticated: false},
    {path: 'professor/exclusao/:id', component: <ProfessorExclusao/>, authenticated: false},
    {path: 'professor/edicao/:id', component: <ProfessorCadastro/>, authenticated: false},
]