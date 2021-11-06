import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function InfoHijos() {
    const cookies = new Cookies();
    const baseUrl = "https://localhost:44329/api/Estudiante_Vistas";
    const baseUrlPadre =  "https://localhost:44329/api/Padre_Vistas/"+cookies.get("cedula");

    const [dataHijos,setDataHijos]=useState([]);
    const [dataPadre,setDataPadre]=useState([]);

    const peticionGet = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrl)
        .then(response=>{
            setDataHijos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetPadre = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrlPadre)
        .then(response=>{
            setDataPadre(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const hijos = dataHijos.filter(estudiante=>dataPadre.find(padre=>padre.cedula==estudiante.cedula));

    useEffect(() => { //Hace efecto la peticion
        peticionGet();
        peticionGetPadre();
        
    }, [])

    return (
        <div className="col-sm-8">
            <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Información Hijos</h2>
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
                </tr>
            </thead>
            <tbody>
                {
                    hijos.map(est=>(
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
                       
                        </tr>
                    ))
                }
               
                
            </tbody>
        </table>
        </div>
    )
}
