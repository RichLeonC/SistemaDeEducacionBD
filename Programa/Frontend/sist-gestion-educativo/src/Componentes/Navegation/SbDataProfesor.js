import React from 'react'

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';

//Partes del sidebar de Profesor
export const sbDataProfesor = [
    {
        title: 'Información Profesor',
        path: '/PrincipalProfesor',
        icon: <AiIcons.AiFillHome/>, 
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
    },

    {
        title: 'Grupos del Periodo',
        path: '/PagGrupoMateria',
        icon: <BiIcons.BiGroup/>, 
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,




        subNav: [
            {
                title: 'Asistencia',
                path: '/PagAsistencia',
                icon: <BsIcons.BsFillPersonCheckFill/>, 
             
            },
            {
                title: 'Evaluaciones',
                path: '/Evaluciones',
                icon: <IoIcons.IoIosPaper/>, 
              

            },


        ]
    },
   
    {
        title: 'Historial Salario',
        path: '/PagHistorialSalario',
        icon: <FaIcons.FaMoneyCheckAlt/>, 
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
    }



]