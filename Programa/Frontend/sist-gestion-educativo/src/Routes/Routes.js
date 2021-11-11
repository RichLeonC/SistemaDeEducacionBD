//USA BOOSTRAP CSS

import React from 'react';
import './App.css';
import Login from '../Componentes/Login/Login.js';
import Estudiantes from '../Componentes/Menu/Estudiantes.js';
import Profesores from "../Componentes/Menu/Profesores.js";
import Padres from '../Componentes/Menu/Padres.js';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Admin from '../Componentes/Menu/Admin.js';

//Componentes

//Componente principal que contiene las rutas a los otros componentes

export default function Routes() {
    

    return (

        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/Estudiantes" component={Estudiantes}/>
                <Route exact path="/Profesores" component={Profesores}/>
                <Route exact path="/Padres" component={Padres}/>
                <Route exact path="/Admin" component={Admin}/>
            </Switch>
            </BrowserRouter>
    )
}


//prueba 