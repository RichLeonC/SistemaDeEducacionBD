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
                title:'Top 10',
                path:'/top',
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
                title: 'TopProfe',
                path: '/topProfe',
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
            }
        ]
    },

]