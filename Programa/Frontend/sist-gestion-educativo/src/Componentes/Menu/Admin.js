import React from 'react';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import { SbDataAdmin } from '../Navegation/SbDataAdmin.js';
import DeudasPadres from '../Administrador/Padres/DeudasPadres.js';
import PromedioGrupos from '../Administrador/Estudiantes/PromedioGrupos.js';


export default function Admin() {
    return (
        <div>
            <BrowserRouter>
            <SideBar datos= {SbDataAdmin} nombre = 'Administrador'/>
            <Switch>

            <Route exact path = '/topPadreDeudas' component= {DeudasPadres}/>
            <Route exact path = '/promAprobados' component= {PromedioGrupos}/>
s
            </Switch>
        </BrowserRouter>
        </div>
    )
}
