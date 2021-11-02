import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import { sbDataProfesor } from '../Navegation/SbDataProfesor';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import PrincipalProfesor from '../PagProfesor/PrincipalProfesor.js';
import PagGrupoMateria from '../PagProfesor/PagGrupoMateria.js';
import PagAsistencia from '../PagProfesor/PagAsistencia.js';


function Profesores(){
  const cookies = new Cookies();
    return(
      <div>
      <BrowserRouter>
          <SideBar datos= {sbDataProfesor} nombre = 'Profesores'/>
          <Switch>

              <Route exact path = '/PrincipalProfesor' component= {PrincipalProfesor}/>
              <Route exact path = '/PagGrupoMateria' component= {PagGrupoMateria}/>
              <Route exact path = '/PagAsistencia' component= {PagAsistencia}/>
             
             
          </Switch>
      </BrowserRouter>
      </div>
      
       
    )
    
}


export default Profesores;