//USA BOOSTRAP CSS

import React,{Component} from 'react';
import './App.css';
import Login from './Componentes/Login.js';
//Componentes


class App extends Component{
    render(){
        return(           
            <div className = "container mt-5">              
            <Login/>
            </div>
         
        )
    }
}

export default App;

//prueba 