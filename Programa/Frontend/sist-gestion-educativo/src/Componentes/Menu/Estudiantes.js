import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Cookies from 'universal-cookie';

function Estudiantes(){
  const cookies = new Cookies();
    return(
        <div>
            <h1>Estudiantes</h1>
        </div>
    )
    
}

export default Estudiantes;