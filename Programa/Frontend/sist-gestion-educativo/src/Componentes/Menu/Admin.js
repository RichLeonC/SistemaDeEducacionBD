import React from 'react';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import { SbDataAdmin } from '../Navegation/SbDataAdmin.js';

export default function Admin() {
    return (
        <div>
            <BrowserRouter>
            <SideBar datos= {SbDataAdmin} nombre = 'Administrador'/>
            <Switch>



            </Switch>
        </BrowserRouter>
        </div>
    )
}
