import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import SideBar from '../Navegation/Sidebar.js';

function Estudiantes(){
  const cookies = new Cookies();
    return(
        <div>
            <h1>Estudiantes</h1>
            <SideBar/>
        </div>
    )
    
}

export default Estudiantes;