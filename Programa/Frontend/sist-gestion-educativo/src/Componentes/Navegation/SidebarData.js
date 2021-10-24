import React from "react";

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SideBarData = [
    {
        title: 'Opciones Estudiante',
        path: '/opcionesEstudiante',
        icon: <AiIcons.AiFillHome/>, 
        iconClosed: <RiIcons.RiArrowDownFill/>,
        iconOpened :<RiIcons.RiArrowUpFill/>,
        subNav: [
            {
                title: 'Estudiate',
                path: '/Opciones/Estudiate',
                icon: <IoIcons.IoIosPaper/>, 
            
            },
            {
                title: 'Grupos',
                path: '/Opciones/Grupos',
                icon: <IoIcons.IoIosPaper/>, 
              

            }

        ]

    },
    {
        title: 'Historial de Notas',
        path: '/historial de Notas',
        icon: <AiIcons.AiFillHome/>, 
        iconClosed: <RiIcons.RiArrowDownFill/>,
        iconOpened :<RiIcons.RiArrowUpFill/>,
        subNav: [
            {
                title: 'CursosAprobados',
                path: '/CursosAprobados/Estudiate',
                icon: <IoIcons.IoIosPaper/>, 
            
            },
            {
                title: 'CursosReprobados',
                path: '/CursosReprobados/Estudiante',
                icon: <IoIcons.IoIosPaper/>, 
              

            }

        ]

    }


]