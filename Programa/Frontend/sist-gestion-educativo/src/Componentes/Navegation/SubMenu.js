import NavItem from '@restart/ui/esm/NavItem'
import { Dropdown } from 'bootstrap';
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const SidebarLink = styled(Link)`
display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #61608E;
    font-color: #FFFF;
    border-left: 4px solid #FFFF;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
margin-left: 16px;
`;

const DropdownLink = styled(Link)`
background: #8C61FB;
height: 60px;
padding-left: 3rem;
display: flex;
align-items: center;
text-decoration: none;
color: #FFFF;
font-size: 18px;
&:hover {
  background: #61608E;
  cursor: pointer;
}
`;

const Submenu = ({item})  => {

const [subNav, setSubNav]= useState (false)
const showSubnav=() =>setSubNav(!subNav)

    return (
        <>
        <SidebarLink  to = {item.path} onClick={item.subNav && showSubnav}>
            <div>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
            </div>
            <div>
                {item.subNav && subNav ? item.iconOpened : item.subNav ? item.iconClosed :  null}
            </div>
        </SidebarLink>
        {subNav && item.subNav.map((item, index) => {
            return (

                <DropdownLink to ={item.path} key={index}>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </DropdownLink>

            )
        })}
        
        </>


    )




}

export default Submenu