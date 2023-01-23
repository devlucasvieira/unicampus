import { Suspense } from "react";
import { HashRouter, Route, Routes, useRouteLoaderData } from "react-router-dom";
import { routes } from "../router";
import { Router } from "../model/Router";
import "./Menu.css";
import { useAuth } from "../hooks/useAuth";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";
import icone from "../../../assets/images/icone.png";

export interface IMenu {
  showSideBar: boolean;
  hideSideBar: () => void;
}

export const Menu = (props: IMenu) => {

  const { logout, isAuthenticated } = useAuth();

  const redirecionar = (link: any) => {
    window.location.hash = link;
    window.location.reload()
  }

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-th-large",
      command:() => { redirecionar("/") }
    },
    {
      label: "Cursos",
      icon: "pi pi-fw pi-folder",
      items: [
        {
          label: "Cadastrar Curso",
          icon: "pi pi-fw pi-plus",
          command:() => { redirecionar("/curso/cadastro") }
        },
        {
          label: "Listar Cursos",
          icon: "pi pi-fw pi-bars",
          command:() => { redirecionar("/curso/lista") }
        }
      ]
    },
    {
      label: "Disciplina",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Cadastrar Disciplina",
          icon: "pi pi-fw pi-plus",
          command:() => { redirecionar("/disciplina/cadastro") }
        },
        {
          label: "Listar Disciplinas",
          icon: "pi pi-fw pi-bars",
          command:() => { redirecionar("/disciplina/lista") }
        }
      ],
    },
    {
      label: "Professores",
      icon: "pi pi-fw pi-users",
      items: [
        {
          label: "Matricular Professor",
          icon: "pi pi-fw pi-plus",
          command:() => { redirecionar("/professor/cadastro") }
        },
        {
          label: "Listar Professores",
          icon: "pi pi-fw pi-bars",
          command:() => { redirecionar("/professor/lista") }
        }
      ],
    },
    {
      label: "Alunos",
      icon: "pi pi-fw pi-users",
      items: [
        {
          label: "Matricular Aluno",
          icon: "pi pi-fw pi-plus",
          command:() => { redirecionar("/aluno/cadastro") }
        },
        {
          label: "Listar Alunos",
          icon: "pi pi-fw pi-bars",
          command:() => { redirecionar("/aluno/lista") }
        }
      ],
    },
    {
      label: "Sair",
      icon: "pi pi-fw pi-calendar-times",
      command: () => logout(),
    },
  ];

  return (
    <HashRouter>
      <Sidebar onHide={props.hideSideBar} visible={props.showSideBar}>
        <div className="p-div-user">
          <img src={icone} alt="Icone - Administrador" style={{border: '5px solid white', borderRadius: '45px'}} />
          <h4 className="p-user-nome">Johan Bragança Gonçalves</h4>
          <p className="p-user-matricula">Matrícula: 20230117</p>
        </div>
        <ul className="list-unstyled fw-normal p-py-3">
          {isAuthenticated() && (
            <PanelMenu model={items} />
          )}
        </ul>
      </Sidebar>
      <Suspense fallback={() => <div>...</div>}>
        <Routes>
          {routes.map((route: Router, index: number) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
