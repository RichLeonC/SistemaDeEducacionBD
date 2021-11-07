import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';

export const SbDataPadre = [
    {
        title: 'Información General',
        path: '/Principal',
        icon: <AiIcons.AiFillHome/>, 
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
        subNav:[
            {
                title: 'Información personal',
                path: '/Principal/InfoPadre',
                icon: <IoIcons.IoIosPaper/>, 
            
            },
            {
                title: 'Información de hijos',
                path: '/Principal/Hijos',
                icon: <IoIcons.IoIosPaper/>, 
                

            },
        ]
    },

    {
        title: 'Pagos',
        path: '/Pagos',
        icon: <FaIcons.FaRegMoneyBillAlt/>,
        iconClosed: <AiIcons.AiFillCaretDown/>,
        iconOpened :<AiIcons.AiFillCaretUp/>,
        subNav:[
            {
                title: 'Cobros',
                path: '/Cobros',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Facturas',
                path: '/Facturas',
                icon: <IoIcons.IoIosPaper/>
            }
        ]
    }
]
    

