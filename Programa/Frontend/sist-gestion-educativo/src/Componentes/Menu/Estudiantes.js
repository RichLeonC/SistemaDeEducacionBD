import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import PaginaPrincipal from '../PagEstu/PaginaPrincipal.js';
import {SideBarData} from '../Navegation/SidebarData.js';
import Login from '../Login/Login.js';
import InfoEstudiante from '../PagEstu/InfoEstudiante.js';

function refreshPage(){
    window.location.reload();
}

function Estudiantes(){
  const cookies = new Cookies();
  
    return(
        <BrowserRouter>
            <SideBar datos= {SideBarData} nombre = 'Estudiantes'/>
            <Switch>

                <Route exact path = '/Principal/info' component= {InfoEstudiante}/>
              
                <Route exact path = '/' component = {Login}/>
               
            </Switch>
        </BrowserRouter>
    )
    
}

export default Estudiantes;