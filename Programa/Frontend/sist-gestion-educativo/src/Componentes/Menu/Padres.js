import React from 'react'
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import {SbDataPadre} from '../Navegation/SbDataPadre.js';
import InfoPadre from '../PagPadre/InfoPadre.js';
import InfoHijos from '../PagPadre/InfoHijos.js';
import Cobros from '../PagPadre/Cobros.js';
import Facturas from '../PagPadre/Facturas.js';
import GruposHijos from '../PagPadre/GruposHijos.js';

export default function Padres() {
    return (
        <div>
            <BrowserRouter>
            <SideBar datos= {SbDataPadre} nombre = 'Padres'/>
            <Switch>

                <Route exact path = '/Principal/InfoPadre' component= {InfoPadre}/>
                <Route exact path = '/Principal/Hijos' component= {InfoHijos}/>
                <Route exact path = '/Cobros' component= {Cobros}/>
                <Route exact path = '/Facturas' component= {Facturas}/>
                <Route exact path = '/GruposHijos' component= {GruposHijos}/>
            </Switch>
        </BrowserRouter>
        </div>
    )
}
