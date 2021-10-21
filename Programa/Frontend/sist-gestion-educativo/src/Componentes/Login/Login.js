import React,{Component} from 'react';
import { Container,Button,Col,Row,Form } from 'react-bootstrap';
import loginIcon from '../../Imagenes/user.svg';
import educImg from '../../Imagenes/education.svg';
import './Login.css';



class Login extends Component{
    render(){
        return(
            <Container className ="mt-5">
                
                <Row>
                    <h2 className="font-weight-bold">Sistema de Gestión</h2>
                    <h2 className="fondo">Educativo</h2>
                  <Col lg={4} md={6} sm={12} className='text-center mt-5 p-3'>
                      <img className="icon-img" src={loginIcon} alt="icon"/>
                        
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        
                        <Form.Control  placeholder="Cédula" />
                      
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        
                        <Form.Control type="password" placeholder="Contraseña" />
                    </Form.Group>
                    <Button variant="primary  w-100" type="submit">
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
}

export default Login;