import React,{Component,useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import Matricula from './Matricula';


export default function GruposMatriculados() {
    const cookies = new Cookies();
    const baseUrl = "https://localhost:44329/api/grupos";
    const baseUrlMatriculas = "https://localhost:44329/api/matriculas";

    const [dataGrupos,setDataGrupos] = useState([]); //Estado para los grupos
    const [dataMatriculas,setDataMatriculas] = useState([]);
    const [dataGruposFiltrados,setDataGruposFiltrados] = useState([]); 

    const [modalFiltro,setModalFiltro] = useState(false);
    const [modalHorario,setModalHorario] = useState(false);

    const abrirCerrarModalFiltro=()=>{ //Cambia el estado del modal de filtro (abierto o cerrado)

        setModalFiltro(!modalFiltro);
    }

    const abrirCerrarModalHorario=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)

        setModalHorario(!modalHorario);

    }

    const peticionGetGrupos = async()=>{ //Realiza peticiones Get al backend Grupos
        await axios.get(baseUrl)
        .then(response=>{
            setDataGrupos(response.data);
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

    const matriculasFiltradas = dataMatriculas.filter(matricula=>matricula.cedulaEstudiante == cookies.get("cedula"));
    
    
    const gruposEstudiante = dataGrupos.filter(grupo=>matriculasFiltradas.find(m=>m.codigoGrupo==grupo.codigoNombre));
    console.log(gruposEstudiante);

    
    
    useEffect(() => { //Hace efecto la peticion
        peticionGetGrupos();  
        peticionGetMatriculas();

        
    }, [])

    return (
        <div className="d-flex">
            <div className="col-sm-8">
                <br/>
                <button onClick={()=>abrirCerrarModalFiltro()} className=" offset-md-3 btn btn-success">Filtrar</button>
                
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
                            <th>Acciones</th>
                            
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
                        <td>
                            <button className="btn btn-primary"
                            >Ver horario</button>{" "}
                        </td>
                        <td>
                            <button className="btn btn-warning"
                            >Ver evaluación</button>{" "}
                        </td>
                     </tr>  
                      ))}
                                                 
                    </tbody>
                  </table>
            </div>

            <Modal isOpen={modalFiltro}>
                      <ModalHeader>Filtrar Grupos</ModalHeader>

                      <ModalBody>
                          <Form>                       
                            <FloatingLabel controlId="floatingSelect" label="Período">
                                <select id="role" name="periodos" className="form-control">
                                    <option value ={-1} selected disabled>Opciones</option>
                                     
                                </select> 
                                <br/>
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingSelect" label="Año">
                                <select id="role" name="annos" className="form-control">
                                    <option value ={-1} selected disabled>Opciones</option>
                                     
                                </select> 
                                   
                            </FloatingLabel>
                              
                          </Form>
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm">Aceptar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalFiltro()}
                        >Cancelar</Button>
                      </ModalFooter>
            </Modal>

           
           
        </div>
    )
}
