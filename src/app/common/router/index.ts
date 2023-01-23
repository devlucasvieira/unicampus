import { Router } from '../model/Router';
import { TesteRouter } from '../../pages/teste/testeRouter';
import { usuarioRouter } from '../../pages/usuario/usuarioRouter';
import { CursoRouter } from "../../pages/curso/CursoRouter";
import { DisciplinaRouter } from '../../pages/disciplinas/DisciplinaRouter';
import { AlunoRouter } from '../../pages/alunos/AlunoRouter';
import { ProfessorRouter } from '../../pages/professores/ProfessorRouter';

export const routes: Router[] = [
	...TesteRouter,
	...usuarioRouter,
	...CursoRouter,
	...DisciplinaRouter,
	...AlunoRouter,
	...ProfessorRouter
];
