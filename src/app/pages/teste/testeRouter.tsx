import React from "react";
import {Router} from "../../common/model/Router";
import Teste from "./Teste";
import Outro from "./Outro";

export const TesteRouter: Router[] = [
    {path: 'teste', component: <Teste/>, exact: false},
    {path: 'outro', component: <Outro/>, exact: false},
]