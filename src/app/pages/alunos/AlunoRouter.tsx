import { Router } from "../../common/model/Router";
import { AlunoListar } from "./AlunoListar";
import { AlunoCadastro } from "./AlunoCadastro";
import { AlunoDetalhe } from "./AlunoDetalhe";
import { AlunoExclusao } from "./AlunoExclusao";

export const AlunoRouter: Router[] = [
    {path: 'aluno/lista', component: <AlunoListar/>, authenticated: false},
    {path: 'aluno/cadastro', component: <AlunoCadastro/>, authenticated: false},
    {path: 'aluno/detalhe/:id', component: <AlunoDetalhe/>, authenticated: false},
    {path: 'aluno/exclusao/:id', component: <AlunoExclusao/>, authenticated: false},
    {path: 'aluno/edicao/:id', component: <AlunoCadastro/>, authenticated: false},
]