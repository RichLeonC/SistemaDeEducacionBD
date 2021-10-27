//USA BOOSTRAP CSS

import React,{Component} from 'react';
import './App.css';
import Login from '../Componentes/Login/Login.js';
import Estudiantes from '../Componentes/Menu/Estudiantes.js';
import Profesores from "../Componentes/Menu/Profesores.js";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import PaginaPrincipal from '../Componentes/PagEstu/PaginaPrincipal';
//Componentes


export default function Routes() {
    const baseUrl = "https://localhost:44329/api/Usuarios";
    return (

        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/Estudiantes" component={Estudiantes}/>
                <Route exact path="/Profesores" component={Profesores}/>
             
               
            </Switch>
            </BrowserRouter>
    )
}


//prueba 