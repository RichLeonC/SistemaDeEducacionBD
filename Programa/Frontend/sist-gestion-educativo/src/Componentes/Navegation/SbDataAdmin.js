import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';


export const SbDataAdmin = [

    {
        title: 'Estudiante',
        path: '/EstadisticaEstudiante',
        icon: <AiIcons.AiFillHome/>, 
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
        subNav:[
            {
                title:'Promedio aprobados',
                path:'/promAprobados',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title:'Cantidad Estudiantes Periodo',
                path:'/CantidadEstudiantes',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title:'Top Ausencias',
                path:'/TopAusencias',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title:'Cantidad Grupos Estudiante',
                path:'/CantidadGruposEstudiante',
                icon: <IoIcons.IoIosPaper/>
            },

            {
                title: 'Generos',
                path: '/Generos',
                icon: <IoIcons.IoIosPaper/>
            }


        ]
    },
    {
        title: 'Profesores',
        path: '/EstadisticaProfesor',
        icon: <FaIcons.FaChalkboardTeacher/>,
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
        subNav:[
            {
                title: 'Promedio Notas Grupo',
                path: '/PromedioNotasGProfe',
                icon:<IoIcons.IoIosPaper/>
            }
        ]
    },

    {
        title: 'Padres',
        path: '/EstadisticaPadre',
        icon: <RiIcons.RiParentFill/>,
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
        subNav:[
            {
                title: 'Top 10 Padres endeudados',
                path: '/topPadreDeudas',
                icon:<IoIcons.IoIosPaper/>
            },
            

        ]
    },

    {
        title: 'General',
        path: '/EstadisticasG',
        icon:<RiIcons.RiBarChartFill/>,
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
        subNav:[
            {
                title: 'Ingresos',
                path: '/Ingresos',
                icon: <RiIcons.RiMoneyDollarCircleLine/>
            },

            {
                title: 'Cantidad Grupos',
                path: '/CantidadGrupos',
                icon: <RiIcons.RiMoneyDollarCircleLine/>
            },
            
            {
                title:'Cobros Vs Facturas',
                path: '/CobrosVsFacturas',
                icon: <RiIcons.RiMoneyDollarCircleLine/>
            }

        ]
    }

]