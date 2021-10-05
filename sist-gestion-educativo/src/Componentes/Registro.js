import React,{Component,Fragment,useState} from 'react';
import './Registro.css';

class Registro extends Component{
    render(){
        return(
            <Fragment> 
                <h1>Estudiante</h1>     
                <form className ="row">
                    <Campo text = "Cedula"/>
                    <Campo text = "Nombre Completo"/>
                    <div className = "row"/>
                    <br/>
                    <Campo text = "Edad"/>
                    <Campo text = "Cedula de Padre"/>
                    
                    <div className = "row"/>
                    <br/>
                    <Opcion text = "Masculino"/>
                    <div className = "row"/>
                    <br/>
                    <Opcion text = "Femenino"/>
                    <div className = "col-md-3">
                        <button className = "btn btn-primary">
                        Agregar
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

class Opcion extends Component{
    render(){
        return(
            <div className="col-md-3">
                <div className="form-check">
                    <input
                    className ="form-check-input"
                    type="radio"
                    name="flexRadioDefult"/>
                    <label className = "form-chek-label" for="flexRadioDefault1">
                    {this.props.text}
                    </label>
                    
                </div>
            </div>
        )
    }
}

export default Registro;