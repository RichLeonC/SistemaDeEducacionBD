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

//Componente que se encarga de crear sidebar
const Nav = styled.div `
background :#6C63FF;
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
  background: #6C63FF;
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
    return (
    <div >
       <Nav >
           <NavIcon to ="#">
            <FaIcons.FaBars color="#FFFF" onClick = {showSidebar}  />
           
           </NavIcon>
           
           <div className="mt-7 offset-md-9">
           <Button className="mt-7 offset-md-5"
         
           variant= "contained"
           href='/'
           color= "primary"
           startIcon = {<BiIcons.BiLogOut/>}
           size= 'medium'
           align= 'right'
           onClick={()=>cerrarSesion()}
           >Cerrar Sesión</Button>

            </div>
           
         
       </Nav>
        <SideBarNav sidebar= {sidebar}>
            <SidebarWrap>
            <NavIcon to ="#">
                 <AiIcons.AiOutlineClose color="#FFFF" onClick ={showSidebar} />
                 
            </NavIcon> 
            {props.datos.map((item, index) => {
                return <SubMenu item = {item} key = {index}/>

            })}
            </SidebarWrap>
        </SideBarNav>
           
       </div>
    );
};
export default  SideBar;