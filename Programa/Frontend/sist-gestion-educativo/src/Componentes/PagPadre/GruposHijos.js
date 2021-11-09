import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';

import axios from 'axios';
import Cookies from 'universal-cookie';

export default function GruposHijos() {
    const cookies = new Cookies();
    const baseUrlHijos ="https://localhost:44329/api/Estudiante_Vistas/"+cookies.get("cedula")+"/1";
    const baseUrlMatriculas = "https://localhost:44329/api/matriculas";
    const baseUrlGrupos = "https://localhost:44329/api/grupos";

    const [modalHijos,setModaHijos] = useState(true);
    const [hijoSeleccionado,setHijoSeleccionado] = useState([]);

    const [dataHijos,setDataHijos]=useState([]);
    const [dataMatriculas,setDataMatriculas] = useState([]);
    const [dataGrupos,setDataGrupos] = useState([]);

    const [gruposEstudiante,setGruposEstudiante] = useState([]);

    const abrirCerrarModalHijos=()=>{
        setModaHijos(!modalHijos);
        if(modalHijos==true){
           setGruposEstudiante(dataGrupos.filter(grupo=>matriculasFiltradas.find(m=>m.codigoGrupo==grupo.codigoNombre)));
        }
    }
    const handlerOpcionHijo=e=>{
        const opcion=e.target.value;
        setHijoSeleccionado(opcion);
        console.log(opcion);

    }
    const peticionGetHijos = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrlHijos)
        .then(response=>{
            setDataHijos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetMatriculas = async()=>{ //Realiza peticiones Get al backend Matriculas
        await axios.get(baseUrlMatriculas)
        .then(response=>{
            setDataMatriculas(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetGrupos = async()=>{ //Realiza peticiones Get al backend Grupos
        await axios.get(baseUrlGrupos)
        .then(response=>{
            setDataGrupos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    const matriculasFiltradas = dataMatriculas.filter(matricula=>matricula.cedulaEstudiante == hijoSeleccionado);

    

    useEffect(() => { //Hace efecto la peticion
        peticionGetHijos();
        peticionGetMatriculas();
        peticionGetGrupos();

    }, [])

    return (
        <div>
            <div  className="col-sm-8">
            <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Grupos por Hijo</h2>
            <table className="table table-hover mt-5 offset-md-3" >
                    <thead>
                        <tr>
                            <th>Código Grupo</th>
                            <th>Materia</th>
                            <th>Profesor</th>
                            <th>Período</th>
                            <th>Año</th>
                            <th>Grado</th>
                            <th>Cupo</th>
                            <th>Estado</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                      {gruposEstudiante.map(grupo=>(
                        <tr key ={grupo.codigoNombre}>
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
  

             <Modal isOpen={modalHijos}>
                      <ModalHeader>Seleccione un hijo</ModalHeader>

                      <ModalBody>
                                             
                      <FloatingLabel controlId="floatingSelect" label="Hijos">
                                <select id="rol" name="hijos" className="form-control" onChange={handlerOpcionHijo}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     {
                                         dataHijos.map((item,i)=>(
                                            <option key={"hijos"+i} value={item.cedula}>{item.nombreCompleto}</option>
                                         ))
                                     }
                                </select> 
                                <br/>
                        </FloatingLabel>
                              
                         
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>abrirCerrarModalHijos()}>Aceptar</Button>
                      </ModalFooter>
            </Modal>
        </div>
        </div>
    )
}
