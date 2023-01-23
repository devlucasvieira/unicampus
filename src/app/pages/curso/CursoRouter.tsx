import { Router } from "../../common/model/Router";
import { CursoListar } from "./CursoListar";
import { CursoCadastro } from "./CursoCadastro";
import { CursoDetalhe } from "./CursoDetalhe";
import { CursoExclusao } from "./CursoExclusao";

export const CursoRouter: Router[] = [
    {path: 'curso/lista', component: <CursoListar/>, authenticated: false},
    {path: 'curso/cadastro', component: <CursoCadastro/>, authenticated: false},
    {path: 'curso/detalhe/:id', component: <CursoDetalhe/>, authenticated: false},
    {path: 'curso/exclusao/:id', component: <CursoExclusao/>, authenticated: false},
    {path: 'curso/edicao/:id', component: <CursoCadastro/>, authenticated: false},
]