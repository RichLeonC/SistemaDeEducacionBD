import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import { sbDataProfesor } from '../Navegation/SbDataProfesor';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import PrincipalProfesor from '../PagProfesor/PrincipalProfesor.js';
import PagGrupoMateria from '../PagProfesor/PagGrupoMateria.js';
import PagAsistencia from '../PagProfesor/PagAsistencia.js';
import PagHistorialSalario from '../PagProfesor/HistorialSalarios.js';
import PagEvaluciones from '../PagProfesor/Evaluacion.js';
import educImg from '../../Imagenes/teacher.svg';


//Componente que adminstra todas las funciones de los profesores, es decir sus rutas.
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
              <Route exact path = '/PagHistorialSalario' component= {PagHistorialSalario}/>
              <Route exact path = '/Evaluciones' component= {PagEvaluciones}/>
              <img className ="w-100 educ-img" src={educImg}/>
             
             
          </Switch>
      </BrowserRouter>
      </div>
      
       
    )
    
}


export default Profesores;