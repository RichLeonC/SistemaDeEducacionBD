import { colors } from '@material-ui/core'
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './Estilos.css'

export default function InfoEstudiante() {
    const cookies = new Cookies();
    const baseUrl = "https://localhost:44329/api/Estudiante_Vistas/"+cookies.get("cedula");
    
    const [dataEstudiante,setDataEstudiante] = useState([]);

    const peticionGet = async()=>{ //Realiza peticiones Get al backend 
        await axios.get(baseUrl)
        .then(response=>{
            setDataEstudiante(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGet();

        
    }, [])


    return (
        <div className="col-sm-8">
             <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Información del Estudiante</h2>
        <table className="table table-hover mt-5 offset-md-3"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Cédula</th>
                <th>NombreCompleto</th>
                <th>Sexo</th>
                <th>Fecha Nacimiento</th>
                <th>Provincia</th>
                <th>Cantón</th>
                <th>Distrito</th>
                <th>Localidad</th>
                <th>Grado</th>
                <th>Padre</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataEstudiante.map(est=>(
                        <tr>
                        <td>{est.cedula}</td>
                        <td>{est.nombreCompleto}</td>
                        <td>{est.sexo}</td>
                        <td>{est.fechaNacimiento}</td>
                        <td>{est.provincia}</td>
                        <td>{est.canton}</td>
                        <td>{est.distrito}</td>
                        <td>{est.localidad}</td>
                        <td>{est.grado}</td>
                        <td>{est.cedulaPadre}</td>
                        </tr>
                    ))
                }
               
                
            </tbody>
        </table>
        </div>
    )
}
