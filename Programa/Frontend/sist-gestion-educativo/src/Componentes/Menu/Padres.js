import React from 'react'
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import {SbDataPadre} from '../Navegation/SbDataPadre.js';
import InfoPadre from '../PagPadre/InfoPadre.js';
import InfoHijos from '../PagPadre/InfoHijos.js';

export default function Padres() {
    return (
        <div>
            <BrowserRouter>
            <SideBar datos= {SbDataPadre} nombre = 'Padres'/>
            <Switch>

                <Route exact path = '/Principal/InfoPadre' component= {InfoPadre}/>
                <Route exact path = '/Principal/Hijos' component= {InfoHijos}/>
            </Switch>
        </BrowserRouter>
        </div>
    )
}
