import React,{useState,useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

export default function Aprobadas(props) {
    const cookies = new Cookies();
    const baseUrlEvalEstudiantes = "https://localhost:44329/api/Evaluacion_Estudiantes";


    const [dataEvalEstudiantes,setDataEvalEstudiantes] = useState([]);

    const peticionGetEE=async()=>{
        await axios.get(baseUrlEvalEstudiantes+"/"+cookies.get("cedula")+"/1")
        .then(response=>{
            setDataEvalEstudiantes(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const aprobados = dataEvalEstudiantes.filter(evaluacion=>evaluacion.estado == "Aprobado");


    useEffect(() => { //Hace efecto la peticion
        peticionGetEE();
    }, [])

    return (
        <div className="col-sm-8">
             <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Cursos Aprobados</h2>
             <table className="table table-hover mt-5 offset-md-3" >
                    <thead>
                        <tr>
                            <th>Código Grupo</th>
                            <th>Materia</th>
                            <th>Período</th>
                            <th>Año</th>                                                    
                            <th>Nota Obtenida</th>
                            <th>Estado</th>                           
                        </tr>
                    </thead>
                    <tbody>
                      {aprobados.map(evaluacion=>(
                        <tr>
                        <td>{evaluacion.codigoGrupo}</td>
                        <td>{evaluacion.nombreMateria}</td>
                        <td>{evaluacion.numPeriodo}</td>
                        <td>{evaluacion.anno}</td>
                        <td>{evaluacion.notaObtenida}</td>
                        <td>{evaluacion.estado}</td>
                     </tr>  
                      ))}
                                                 
                    </tbody>
                  </table>
            
        </div>
    )
}
