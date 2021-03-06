import React from 'react';
import SideBar from '../Navegation/Sidebar.js';
import  {BrowserRouter, Switch , Route} from 'react-router-dom';
import { SbDataAdmin } from '../Navegation/SbDataAdmin.js';
import DeudasPadres from '../Administrador/Padres/DeudasPadres.js';
import PromediNotas from '../Administrador/Profesores/PromedioNotasGrupo.js';
import CantidadGrupo from '../Administrador/Estudiantes/CantidadEstGruPe.js';
import PromedioGrupos from '../Administrador/Estudiantes/PromedioGrupos.js';
import Ingresos from '../Administrador/General/Ingresos.js';
import CantidadGruPeriodo from '../Administrador/General/CantidadGruposPe.js';
import TopAusencias from '../Administrador/Estudiantes/TopAusencias.js';
import CantidadGruposEstudiante from '../Administrador/Estudiantes/CantidadGruposEstudiante.js';
import Generos from '../Administrador/Estudiantes/Generos.js';
import CobrosFacturas from '../Administrador/General/CobrosFacturas.js';
import TopProfesores from '../Administrador/Profesores/TopProfesores.js';
import CantidadAR from '../Administrador/Profesores/CantidadAR.js';
import InfoAcademica from '../Administrador/Estudiantes/InfoAcademica.js';
import VentasPeriodo from '../Administrador/General/VentasPeriodo.js';
import PorcentajeReprobados from '../Administrador/Estudiantes/PorcentajeReprobados.js';
import Top15Grupos from '../Administrador/Profesores/Top15Grupos.js';
import educImg from '../../Imagenes/programmers.svg';

export default function Admin() {
    return (
        <div>
            <BrowserRouter>
            <SideBar datos= {SbDataAdmin} nombre = 'Administrador'/>
            <Switch>

            <Route exact path = '/topPadreDeudas' component= {DeudasPadres}/>
            <Route exact path = '/promAprobados' component= {PromedioGrupos}/>
            <Route exact path = '/PromedioNotasGProfe' component= {PromediNotas}/>
            <Route exact path = '/Ingresos' component= {Ingresos}/>
            <Route exact path = '/CantidadEstudiantes' component= {CantidadGrupo}/>
            <Route exact path = '/CantidadGrupos' component= {CantidadGruPeriodo}/>
            <Route exact path = '/TopAusencias' component= {TopAusencias}/>
            <Route exact path = '/CantidadGruposEstudiante' component= {CantidadGruposEstudiante}/>
            <Route exact path = '/Generos' component= {Generos}/>
            <Route exact path = '/CobrosVsFacturas' component= {CobrosFacturas}/>
            <Route exact path = '/TopProfesores' component= {TopProfesores}/>
            <Route exact path = '/CantidadAR' component= {CantidadAR}/>
            <Route exact path = '/Informaci??nAcademica' component= {InfoAcademica}/>
            <Route exact path = '/VentasPeriodo' component= {VentasPeriodo}/>
            <Route exact path = '/ReprobacionGrupo' component= {PorcentajeReprobados}/>
            <Route exact path = '/Top15Grupos' component= {Top15Grupos}/>
            <img className ="w-100 educ-img" src={educImg}/>
            </Switch>
        </BrowserRouter>
        </div>
    )
}
