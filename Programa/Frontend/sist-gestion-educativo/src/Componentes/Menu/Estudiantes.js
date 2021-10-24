import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import SideBar from '../Navegation/Sidebar.js';
<<<<<<< Updated upstream
=======
import  {BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import PaginaPrincipal from '../PagEstu/PaginaPrincipal.js';
import { SideBarData } from '../Navegation/SidebarData.js';
>>>>>>> Stashed changes

function Estudiantes(){
  const cookies = new Cookies();
    return(
<<<<<<< Updated upstream
        <div>
            <h1>Estudiantes</h1>
            <SideBar/>
        </div>
=======
        <Router>
            <SideBar elementos = {SideBarData}/>
            <Switch>
                <Router path = '/paginaprincipal' exact Component= {PaginaPrincipal}/>
            </Switch>
        </Router>
>>>>>>> Stashed changes
    )
    
}

export default Estudiantes;