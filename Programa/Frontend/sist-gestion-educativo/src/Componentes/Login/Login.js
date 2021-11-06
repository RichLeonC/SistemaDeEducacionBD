import React,{Component,useState} from 'react';
import { Container,Button,Col,Row,Form } from 'react-bootstrap';
import loginIcon from '../../Imagenes/user.svg';
import educImg from '../../Imagenes/education.svg';
import './Login.css';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import axios from 'axios';






function Login(props){
    //Conexion con el backend
    const baseUrl = "https://localhost:44329/api/Usuarios";
    const cookies = new Cookies();
     //Determinamos un estado para setear los atributos
    const [form,setForm] = useState({
    cedula:'',
    clave:''
    });

    //Metodo para capturar lo escrito en los campos del login
    const handleChange=e=>{
        const{name,value} = e.target;
        setForm({
            ...form,
            [name]:value
        });
        console.log(form);
    }
    //Metodo para iniciar sesion
    const iniciarSesion=async()=>{
        
        await axios.get(baseUrl+`/${form.cedula}/${md5(form.clave)}`)  //Crea la peticion http mediante la URL (se dirige a UsuariosControlador en el backend) 
        .then(response=>{ //En caso de que sea correcta
            return response.data;
        }).then(response=>{
            
            if(response.length>0){
                var respuesta=response[0];
                console.log(respuesta);
                cookies.set("cedula",respuesta.cedula,{path: "/"});
                cookies.set("nombre",respuesta.nombre,{path: "/"});
                cookies.set("apellido1",respuesta.apellido1 ,{path: "/"});
                cookies.set("apellido2",respuesta.apellido2,{path: "/"});
                cookies.set("contraseña",respuesta.clave,{path: "/"});
                cookies.set("sexo",respuesta.sexo,{path: "/"});
                cookies.set("fechaNacimiento",respuesta.fechaNacimiento,{path: "/"});
                cookies.set("rol",respuesta.rol,{path: "/"});
                cookies.set("fechaCreacion",respuesta.fechaCreacion,{path: "/"});
                alert("Bienvenido: "+respuesta.nombre+" "+respuesta.apellido1)
                if(respuesta.rol == ("Profesor")){
                    props.history.push("/Profesores");
                }
                else  if(respuesta.rol == ("Estudiante")){
                    props.history.push("/Estudiantes");
                }
                else if(respuesta.rol ==("Padre")){
                    props.history.push("/Padres")
                }
            }
            else{
                alert("El usuario o contraseña no son correctoss");
            }
        })
        .catch(error=>{
            alert("El usuario o contraseña no son correctoss");
            console.log(error);
        })
    }
    return(
            <Container className ="mt-5">
                
                <Row>
                    <h2 className="font-weight-bold">Sistema de Gestión</h2>
                    <h2 className="fondo">Educativo</h2>
                  <Col lg={4} md={6} sm={12} className='text-center mt-5 p-3'>
                      <img className="icon-img" src={loginIcon} alt="icon"/>
                        
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        
                        <Form.Control name="cedula" placeholder="Cédula" onChange={handleChange}/>
                      
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        
                        <Form.Control type="password" name="clave" placeholder="Contraseña" onChange={handleChange} />
                    </Form.Group>
                    <Button  variant="primary  w-100" onClick={()=>iniciarSesion()}>
                        Ingresar
                    </Button>

                    </Form>
                     
                  </Col>
                    
                  <Col lg={8} md={6} sm={12}>
                      <img className ="w-100 educ-img" src={educImg}/>
                  </Col>
                </Row>
            </Container>
        )
    
}

export default Login;