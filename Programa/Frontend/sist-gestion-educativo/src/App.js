//USA BOOSTRAP CSS

import React,{Component} from 'react';
import './App.css';
//Componentes
import Registro from './Componentes/Registro.js';

class App extends Component{
    render(){
        return(           
            <div className = "container mt-5">
                <Registro/> 
            </div>
         
        )
    }
}

export default App;

//prueba 