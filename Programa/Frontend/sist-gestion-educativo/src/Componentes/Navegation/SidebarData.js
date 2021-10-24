import React from "react";

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
export const SideBarData = [
    {
        title: 'Pantalla Principal',
        path: '/opcionesEstudiante',
        icon: <AiIcons.AiFillHome/>, 
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
        subNav: [
            {
                title: 'Informacion del Estudiante',
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
        icon: <AiIcons.AiFillBook/>, 
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
        subNav: [
            {
                title: 'Cursos Aprobados',
                path: '/CursosAprobados/Estudiate',
                icon: <IoIcons.IoIosPaper/>, 
            
            },
            {
                title: 'Cursos Reprobados',
                path: '/CursosReprobados/Estudiante',
                icon: <IoIcons.IoIosPaper/>, 
              

            }

        ]

    },
    {
        title: 'Matriculas',
        path: '/opcionesMatriculas',
        icon: <AiIcons.AiFillCopy/>, 
        
    }


]