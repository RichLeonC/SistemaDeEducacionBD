import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Cookies from 'universal-cookie';

function Profesores(){
  const cookies = new Cookies();
    return(
        <div>
            <h1>Profesores</h1>
        </div>
    )
    
}

export default Profesores;