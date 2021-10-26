import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import styled from 'styled-components';
import { SideBarData } from './SidebarData';
import SubMenu from './SubMenu';
import * as BiIcons from 'react-icons/bi'
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';

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

const SideBar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = ()=> setSidebar(!sidebar);


    const cookies = new Cookies();

    const cerrarSesion=()=> {
        cookies.remove('cedula', {path: '/'});
        cookies.remove('nombre', {path: '/'});
        cookies.remove('apellido1', {path: '/'});
        cookies.remove('apellido2', {path: '/'});
        cookies.remove('sexo', {path: '/'});
        cookies.remove('fechaNacimiento', {path: '/'});
        this.props.history.push('./');
    }

    return (<>
       <Nav>
           <NavIcon to ="#">
            <FaIcons.FaBars onClick = {showSidebar}  />
           
           </NavIcon>
           
           <Button className='offset-md-9'
           variant= "contained"
           href='/'
           color= "primary"
           startIcon = {<BiIcons.BiLogOut/>}
           size= 'medium'
           align= 'right'
           onClick={()=>cerrarSesion()}
           >Cerrar Sesión</Button>

           
         
       </Nav>
        <SideBarNav sidebar= {sidebar}>
            <SidebarWrap>
            <NavIcon to ="#">
                 <AiIcons.AiOutlineClose  onClick ={showSidebar} />
                 
            </NavIcon> 
            {SideBarData.map((item, index) => {
                return <SubMenu item = {item} key = {index}/>

            })}
            </SidebarWrap>
        </SideBarNav>
           
       </>
    );
};
export default  SideBar;