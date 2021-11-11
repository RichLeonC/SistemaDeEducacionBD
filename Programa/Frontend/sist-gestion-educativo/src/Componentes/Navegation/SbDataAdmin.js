import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';


export const SbDataAdmin = [

    {
        title: 'Estudiante',
        path: '/Estudiante',
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
    }

]