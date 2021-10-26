import { render } from '@testing-library/react';
import React,{Component , useState} from 'react';
import Cookies from 'universal-cookie';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import PaginaPrincipal from '../PagEstu/PaginaPrincipal.js';
import {SideBarData} from '../Navegation/SidebarData.js';
import Login from '../Login/Login.js';
import InfoEstudiante from '../PagEstu/InfoEstudiante.js';
import Calendar from 'react-calendar';

function refreshPage(){
    window.location.reload();
}

function Estudiantes(){
  const cookies = new Cookies();
  const [date, setDate]= useState(new Date())

   const onChange = date =>{
    setDate(date);
  
   } ;

    return(
        <div>
        <BrowserRouter>
            <SideBar datos= {SideBarData} nombre = 'Estudiantes'/>
            <Switch>

                <Route exact path = '/Principal/info' component= {InfoEstudiante}/>
              
                <Route exact path = '/PaginaPrincipal' component = {PaginaPrincipal}/>
               
            </Switch>
        </BrowserRouter>

        <h1>Estudiantes</h1>
        <Calendar onChange={onChange} value={date} />
   

        </div>
    )
    
}


export default Estudiantes;