import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function InfoPadre() {
    const cookies = new Cookies();
    const baseUrl = "https://localhost:44329/api/Padre_Vistas/"+cookies.get("cedula");

    const [dataPadre,setDataPadre]=useState([]);

    const peticionGet = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrl)
        .then(response=>{
            setDataPadre(response.data);
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
            <h2 className="text-center offset-md-5 font-weight-bold">Información Personal</h2>
            <table className="table table-hover mt-5 offset-md-3"striped bordered hover variant="light">
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
                <th>Profesión</th>
                <th>Cónyuge</th>
                <th>Telefono Cónyuge</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataPadre.map(padre=>(
                        <tr>
                        <td>{padre.cedula}</td>
                        <td>{padre.nombreCompleto}</td>
                        <td>{padre.sexo}</td>
                        <td>{padre.fechaNacimiento}</td>
                        <td>{padre.provincia}</td>
                        <td>{padre.canton}</td>
                        <td>{padre.distrito}</td>
                        <td>{padre.localidad}</td>
                        <td>{padre.profesion}</td>
                        <td>{padre.conyugeNombre}</td>
                        <td>{padre.telefonoConyugue}</td>
                       
                        </tr>
                    ))
                }
               
                
            </tbody>
        </table>
        </div>
    )
}
