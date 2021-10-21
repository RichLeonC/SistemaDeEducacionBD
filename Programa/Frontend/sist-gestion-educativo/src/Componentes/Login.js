import React,{Component} from 'react';
import { Container } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Login extends Component{
    render(){
        return(
            <Container className ="mt-5">
                <Row>
                  <Col lg={4} md={6} sm={12}>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        
                        <Form.Control type="email" placeholder="Enter email" />
                      
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                   
                    <Button variant="primary  w-100" type="submit">
                        Login
                    </Button>
                    </Form>   
                  </Col>
                    
                  <Col lg={4} md={6} sm={12}></Col>
                </Row>
            </Container>
        )
    }
}

export default Login;