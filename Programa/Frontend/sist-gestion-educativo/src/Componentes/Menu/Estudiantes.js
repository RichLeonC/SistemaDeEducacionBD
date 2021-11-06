
import React from 'react';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import PaginaPrincipal from '../PagEstu/PaginaPrincipal.js';
import {SideBarData} from '../Navegation/SidebarData.js';
import InfoEstudiante from '../PagEstu/InfoEstudiante.js';
import Matricula from '../PagEstu/Matricula.js';
import GruposMatriculados from '../PagEstu/GruposMatriculados.js';
import Aprobadas from '../PagEstu/Aprobadas.js';
import Reprobadas from '../PagEstu/Reprobadas.js';
import AsistenciaEstudiante from '../PagEstu/AsistenciaEstudiante.js';
//import Calendar from 'react-calendar';



function Estudiantes(){

  

    return(
        <div>
        <BrowserRouter>
            <SideBar datos= {SideBarData} nombre = 'Estudiantes'/>
            <Switch>

                <Route exact path = '/Principal/info' component= {InfoEstudiante}/>
              
                <Route exact path = '/PaginaPrincipal' component = {PaginaPrincipal}/>
                <Route exact path = '/Matriculas' component = {Matricula}/>
                <Route exact path = '/Grupos' component = {GruposMatriculados}/>
                <Route exact path = '/CursosAprobados' component = {Aprobadas}/>
                <Route exact path = '/CursosReprobados' component = {Reprobadas}/>
                <Route exact path = '/MiAsistencia' component = {AsistenciaEstudiante}/>
            </Switch>
        </BrowserRouter>

       
        {/*<Calendar onChange={onChange} value={date} />*/}
   

        </div>
    )
    
}


export default Estudiantes;