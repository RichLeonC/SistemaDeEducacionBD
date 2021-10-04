import React,{Component} from 'react';
import './App.css';
//Componentes
import Registro from './Componentes/Registro.js';

class App extends Component{
    render(){
        return(           
            <div className = "container mt-5">
                <Registro myText = "Melissa"/> 
                <Registro myText = "Edad"/>
            </div>
         
        )
    }
}

export default App;

//prueba 