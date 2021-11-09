import React,{Component,useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import PagAsistencia from './PagAsistencia';



export default function PagGrupoMateria() {
<<<<<<< Updated upstream
    const baseUrl = "https://localhost:44307/api/Grupos";
=======
    const baseUrlGrupo = "https://localhost:44329/api/Grupos";
    const baseURLEvalucionesEstudiante = "https://localhost:44329/api/Evaluacion_Estudiantes";
    const baseUrlEstudiantes =  "https://localhost:44329/api/estudiantes";
    const baseUrlUsuarios =  "https://localhost:44329/api/Usuarios";
    const baseUrlMatriculas = "https://localhost:44329/api/matriculas";

    const[modalAviso, setModalAviso]= useState(false);
    const [estudiantesF, setEstudiantesF]= useState([]);// estudiantes vinculados a un grupo
>>>>>>> Stashed changes
    const [data,setData] = useState([]);
    const [Ugrupo, setGrupo] = useState([]);

    
    const cookies = new Cookies();

    var cedula = cookies.get("cedula");// toma la cedula del profesor que haya iniciado sesión. 


    const peticionGet = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrl+`/${cedula}`)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    
    useEffect(() => { //Hace efecto la peticion
        peticionGet();
        
    }, [])

    const history = useHistory();

    const PasarPag=(grupo)=> {
        let path = '/PagAsistencia'; 
        history.push(path);
      

    }

    
    

    return (//Metodo que despliega la tabla de los grupos asignados al profesor que inició seseión
   
        <div className="d-flex">
                <div className = "col-sm-8">
                    <br/>
                    
                    <table className="table table-hover mt-5 offset-md-3" >
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Materia</th>
                                <th>Cédula Profesor</th>
                                <th>Periodo</th>
                                <th>Año</th>
                                <th>Grado</th>
                                <th>Cupo</th>
                                <th>Estado</th>
                             
                            </tr>
                        </thead>
                        <tbody>
                          {data.map(grupo=>(
                            <tr key ={grupo.codigoNombre, grupo.nombreMateria, grupo.anno, grupo.numPeriodo}>
                            <td>{grupo.codigoNombre}</td>
                            <td>{grupo.nombreMateria} </td>
                            <td>{grupo.cedulaProfesor}</td>
                            <td>{grupo.numeroPeriodo}</td>
                            <td>{grupo.anno}</td>
                            <td>{grupo.grado}</td>
                            <td>{grupo.cupo}</td>
                            <td>{grupo.estado}</td>
                           
                            
                         </tr>  
                          ))}
                                                     
                        </tbody>
                      </table>
    
                </div>
                </div>
                )}