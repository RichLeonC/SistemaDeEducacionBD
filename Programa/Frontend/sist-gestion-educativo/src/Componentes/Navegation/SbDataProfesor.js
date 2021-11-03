import React from 'react'

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';

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
    },
    {
        title: 'Asistencia',
        path: '/PagAsistencia',
        icon: <BiIcons.BiGroup/>, 
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
    }



]