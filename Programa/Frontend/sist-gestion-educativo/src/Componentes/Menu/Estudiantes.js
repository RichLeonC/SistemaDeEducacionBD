import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Cookies from 'universal-cookie';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import PaginaPrincipal from '../PagEstu/PaginaPrincipal.js';

function Estudiantes(){
  const cookies = new Cookies();
    return(
        <Router>
            <SideBar/>
            <Switch>
                <Router path = '/paginaprincipal' exact Component= {PaginaPrincipal}/>
            </Switch>
        </Router>
    )
    
}

export default Estudiantes;