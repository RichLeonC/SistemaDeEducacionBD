import React,{Component} from 'react';
import './Registro.css';

class Registro extends Component{
    render(){
        return(
            <div>
                <h3>           
                    {this.props.myText}
                </h3>
                <input type = "text"/>

            </div>
        )
    }

}

export default Registro;