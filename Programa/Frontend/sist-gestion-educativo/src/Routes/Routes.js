//USA BOOSTRAP CSS

import React,{Component,useState,useEffect} from 'react';
import './App.css';
import Login from '../Componentes/Login/Login.js';
import Estudiantes from '../Componentes/Menu/Estudiantes.js';
import Profesores from "../Componentes/Menu/Profesores.js";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import PaginaPrincipal from '../Componentes/PagEstu/PaginaPrincipal';
import axios from 'axios';
//Componentes


export default function Routes() {
    

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