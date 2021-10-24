import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import styled from 'styled-components';
import { SideBarData } from './SidebarData';
import SubMenu from './SubMenu';

import PropTypes from 'prop-types';

const Nav = styled.div `
background : #15171c;
height : 80px;
display: flex;
justify-content : flex-start;
align-items: center;

`;

const NavIcon = styled (Link) ` 
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content : flex-start;
    align-items: center;
    

`;

const SideBarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const SideBar = (props) => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = ()=> setSidebar(!sidebar);

    return (<>
       <Nav>
           
           <NavIcon to ="#">
            <FaIcons.FaBars onClick = {showSidebar}  />

            <h2 >Estudiantes </h2 >
            
           </NavIcon>
       </Nav>
        <SideBarNav sidebar= {sidebar}>
            <SidebarWrap>
            <NavIcon to ="#">
                 <AiIcons.AiOutlineClose  onClick ={showSidebar} />
            </NavIcon> 
            {props.datos.map((item, index) => {
                return <SubMenu item = {item} key = {index}/>

            })}
            
            </SidebarWrap>
        </SideBarNav>

       </>
    );
};
export default  SideBar;