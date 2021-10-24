import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter as Router, Switch , Route} from 'react-router-dom';

function Estudiantes(){
  const cookies = new Cookies();
    return(
        <Router>
        {/*<h1>Estudiantes</h1>*/}
            <SideBar/>
        </Router>
    )
    
}

export default Estudiantes;