import { colors } from '@material-ui/core'
import { Card,ListGroup,Table} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import axios from 'axios';
import React,{useState,useEffect} from 'react';


//Componente que muestra los datos del profesor
export default function PrincipalProfesor() {
    const cookies = new Cookies();

    const baseUrl = "https://localhost:44307/api/Profesor_Vistas/"+cookies.get("cedula");
    
    const [dataProfesor,setDataProfesor] = useState([]);

    const peticionGet = async()=>{ //Realiza peticiones Get al backend 
        await axios.get(baseUrl)
        .then(response=>{
            setDataProfesor(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGet();

        
    }, [])




    return (// metodo que despliega la tabla que muestra los datos del profesor 
        <div className= "col-sm-8">
              <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Información del Profesor</h2>
        <Table className="mt-5 offset-md-3 table table-hover"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Cédula</th>
                <th>Nombre Completo</th>
                <th>Sexo</th>
                <th>Fecha Nacimiento</th>
                <th>Provincia</th>
                <th>Cantón</th>
                <th>Distrito</th>
                <th>Localidad</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataProfesor.map(est=>(
                        <tr>
                        <td>{est.cedula}</td>
                        <td>{est.nombreCompleto}</td>
                        <td>{est.sexo}</td>
                        <td>{est.fechaNacimiento}</td>
                        <td>{est.provincia}</td>
                        <td>{est.canton}</td>
                        <td>{est.distrito}</td>
                        <td>{est.localidad}</td>
                        </tr>
                    ))
                }
               
                
            </tbody>
        </Table>
        </div>
    )
    
}