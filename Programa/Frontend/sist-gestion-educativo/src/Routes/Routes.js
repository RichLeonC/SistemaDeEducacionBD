//USA BOOSTRAP CSS

import React,{Component} from 'react';
import './App.css';
import Login from '../Componentes/Login/Login.js';
import Estudiantes from '../Componentes/Menu/Estudiantes.js';
import Profesores from "../Componentes/Menu/Profesores.js";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import PaginaPrincipal from '../Componentes/PagEstu/PaginaPrincipal';
//Componentes


class App extends Component{
    render(){
        return(           
            
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/Estudiantes" component={Estudiantes}/>
                <Route exact path="/Profesores" component={Profesores}/>
             
               
            </Switch>
            </BrowserRouter>
         
        )
    }
}

export default App;

//prueba 