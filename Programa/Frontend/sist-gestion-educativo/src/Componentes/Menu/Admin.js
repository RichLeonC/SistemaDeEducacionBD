import React from 'react';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import { SbDataAdmin } from '../Navegation/SbDataAdmin.js';
import DeudasPadres from '../Administrador/Padres/DeudasPadres.js';
import PromediNotas from '../Administrador/Profesores/PromedioNotasGrupo.js';
import CantidadGrupo from '../Administrador/Estudiantes/CantidadEstGruPe.js';
import PromedioGrupos from '../Administrador/Estudiantes/PromedioGrupos.js';


export default function Admin() {
    return (
        <div>
            <BrowserRouter>
            <SideBar datos= {SbDataAdmin} nombre = 'Administrador'/>
            <Switch>

            <Route exact path = '/topPadreDeudas' component= {DeudasPadres}/>
            <Route exact path = '/promAprobados' component= {PromedioGrupos}/>

            <Route exact path = '/PromedioNotasGProfe' component= {PromediNotas}/>
            <Route exact path = '/CantidadEstudiantes' component= {CantidadGrupo}/>


            </Switch>
        </BrowserRouter>
        </div>
    )
}
