import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import { sbDataProfesor } from '../Navegation/SbDataProfesor';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter as Router, Switch , Route} from 'react-router-dom';

function Profesores(){
  const cookies = new Cookies();
    return(
       
        <SideBar datos= {sbDataProfesor} nombre = 'Profesores'/>
       
    )
    
}

export default Profesores;