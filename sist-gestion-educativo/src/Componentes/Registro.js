import React,{Component,Fragment,useState} from 'react';
import './Registro.css';

class Registro extends Component{
    render(){
        return(
            <Fragment> 
                <h1>Estudiante</h1>     
                <form className ="row">
                    <Campo text = "Cedula"/>
                    <Campo text = "Nombre"/>
                    <div className = "col-md-3">
                        <button className = "btn btn-primary">
                        Enviar
                        </button>
                    </div>
                </form>

               

            </Fragment>
        )
    }

}

class Campo extends Component{
    render(){
        return(
            <div className = "col-md-3">
                <input  
                placeholder = {this.props.text}
                className = "form-control"
                />
              
            </div>
        )

    }
}

export default Registro;