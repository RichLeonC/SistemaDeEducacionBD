import React from "react";


import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
export const SideBarData = [
    {
        title: 'Información General',
        path: '/Principal',
        icon: <AiIcons.AiFillHome/>, 
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
        subNav: [
            {
                title: 'Información del Estudiante',
                path: '/Principal/info',
                icon: <BsIcons.BsFillPersonFill/>, 
            
            },
            {
                title: 'Grupos',
                path: '/Grupos',
                icon: <MdIcons.MdLibraryBooks/>, 
              

            },

            {
                title: 'Mi Asistencia',
                path: '/MiAsistencia',
                icon: <BsIcons.BsFillPersonCheckFill/>, 
              

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
                path: '/CursosAprobados',
                icon: <IoIcons.IoIosPaper/>, 
            
            },
            {
                title: 'Cursos Reprobados',
                path: '/CursosReprobados',
                icon: <IoIcons.IoIosPaper/>, 
              

            }

        ]

    },
    {
        title: 'Matriculas',
        path: '/Matriculas',
        icon: <AiIcons.AiFillCopy/>, 
        
    }

 

]