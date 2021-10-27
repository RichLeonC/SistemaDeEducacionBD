import React,{Component,useState,useEffect} from 'react';
import { InputGroup,FormControl,Card } from 'react-bootstrap';
import axios from 'axios';


export default function Matricula() {
    const baseUrl = "https://localhost:44329/api/matriculas";
    const [data,setData] = useState([]);
    
    const peticionGet = async()=>{ //Realiza peticiones al backend
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    useEffect(() => { //Hace efecto la peticion
        peticionGet();
        
    }, [])
    return (
    <Card>
    <div className="d-flex">
            <div className = "col-sm-8">
                <table className="table table-hover mt-5 offset-md-3" >
                    <thead>
                        <tr>
                            <th>ID matricula</th>
                            <th>Coste matricula</th>
                            <th>Fecha Creación</th>
                            <th>Estudiante</th>
                            <th>Grupo</th>
                            <th>Período</th>
                            <th>Año</th>
                            <th>Materia</th>
                        </tr>
                    </thead>
                    <tbody>
                      {data.map(matricula=>(
                        <tr key ={matricula.idMatricula}>
                        <td>{matricula.idMatricula}</td>
                        <td>{matricula.costeMatricula} </td>
                        <td>{matricula.fechaCreacion}</td>
                        <td>{matricula.cedulaEstudiante}</td>
                        <td>{matricula.codigoGrupo}</td>
                        <td>{matricula.numPeriodo}</td>
                        <td>{matricula.anno}</td>
                        <td>{matricula.nombreMateria}</td>
                     </tr>  
                      ))}
                                                 
                    </tbody>
                  </table>
            </div>
            
      
  
    </div>
    </Card>
    )
}
