//USA BOOSTRAP CSS

import React,{Component} from 'react';
import './App.css';
import Login from '../Componentes/Login/Login.js';
import Estudiantes from '../Componentes/Menu/Estudiantes.js';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
//Componentes


class App extends Component{
    render(){
        return(           
            
            <BrowserRouter>
            <Switch>
                <Route path="/" component={Login}/>
                <Route path="/menu" component={Estudiantes}/>
            </Switch>
            </BrowserRouter>
         
        )
    }
}

export default App;

//prueba 