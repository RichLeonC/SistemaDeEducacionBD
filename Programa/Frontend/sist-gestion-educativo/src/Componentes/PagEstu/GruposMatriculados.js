import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import Cookies from 'universal-cookie';


//Compontente que lista los grupos matriculados por el estudiante y permite filtrarlos
export default function GruposMatriculados() {
    const cookies = new Cookies();
    const baseUrl = "https://localhost:44329/api/grupos";
    const baseUrlMatriculas = "https://localhost:44329/api/matriculas";
    const baseUrlPeriodos = "https://localhost:44329/api/periodos";
    const baseUrlHorarios = "https://localhost:44329/api/Grupo_Horarios";
    const baseUrlEvaluaciones = "https://localhost:44329/api/Evaluaciones";
    

    const [dataGrupos,setDataGrupos] = useState([]); //Estado para los grupos
    const [dataMatriculas,setDataMatriculas] = useState([]);
    const [dataPeriodos,setDataPeriodos] = useState([]);
    const [dataHorarios,setDataHorarios] = useState([]);
    const [horariosFiltrados,setHorariosFiltrados] = useState([]);
    const [dataEvaluaciones,setDataEvaluaciones] = useState([]);
    const [evaluacionesFiltradas,setEvaluacionesFiltradas] = useState([]);
    const [numSeleccionado, setNumSeleccionado] = useState([]);
    const [annoSeleccionado, setAnnoSeleccionado] = useState([]);
    const [grupoSeleccionado,setGrupoSeleccionado] = useState([]);

    const [modalFiltro,setModalFiltro] = useState(false); 
    const [modalHorario,setModalHorario] = useState(false);
    const [modalEvaluacion,setModalEvaluacion] = useState(false);

    const abrirCerrarModalFiltro=()=>{ //Cambia el estado del modal de filtro (abierto o cerrado)

        setModalFiltro(!modalFiltro);
        if(modalFiltro == false){
            peticionGetGrupos();
        }
    }
    

    const abrirCerrarModalHorario=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)

        setModalHorario(!modalHorario);

    }

    const abrirCerrarModalEvaluacion=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)

        setModalEvaluacion(!modalEvaluacion);

    }

    const handlerOpcionNum=e=>{  //Handler para guardar en el estado el numero de periodo escogidp
        const opcion = e.target.value;
        setNumSeleccionado(opcion);
        console.log(opcion);
    }

    const handlerOpcionAnno=e=>{  //Handler para guardar en el estado el numero de periodo escogidp
        const opcion = e.target.value;
        setAnnoSeleccionado(opcion);
        console.log(opcion);
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

    const peticionGetPeriodos = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlPeriodos)
        .then(response=>{
            setDataPeriodos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetHorarios = async()=>{ //Realiza peticiones Get al backend Grupo_Horarios
        await axios.get(baseUrlHorarios)
        .then(response=>{
            setDataHorarios(response.data);
            
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetEvaluaciones = async()=>{ //Realiza peticiones Get al backend Evaluaciones_Estudiante
        await axios.get(baseUrlEvaluaciones)
        .then(response=>{
            setDataEvaluaciones(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const matriculasFiltradas = dataMatriculas.filter(matricula=>matricula.cedulaEstudiante == cookies.get("cedula"));
    
    
    const gruposEstudiante = dataGrupos.filter(grupo=>matriculasFiltradas.find(m=>m.codigoGrupo==grupo.codigoNombre));



    function filtroNumerosPeriodo(){ //Omite los numeros de periodo duplicados
        let filtradosP = [];
        
        for(let periodo of dataPeriodos){
            if(!filtradosP.includes(periodo.numero)){
                filtradosP.push(periodo.numero);
            }
            
        }
        return filtradosP;

    }

    function filtroAnnosPeriodo(){ //Omite los numeros de a??o duplicados
        let filtradosA = [];

        for(let periodo of dataPeriodos){
            if(!filtradosA.includes(periodo.anno)){
                filtradosA.push(periodo.anno);
            }
            
        }
        return filtradosA;
    }

    const gruposFiltrados=()=>{
        abrirCerrarModalFiltro();
        setDataGrupos(dataGrupos.filter(grupo=>grupo.numeroPeriodo == numSeleccionado && grupo.anno == annoSeleccionado));
    }

    //Funcion que se encarg de setear el grupo escogido y filtrar sus horarios o evaluaciones
    const seleccionarGrupo=(grupo,caso)=>{
        setGrupoSeleccionado(grupo);
        setHorariosFiltrados(dataHorarios.filter(horario=>horario.codigoGrupo==grupo.codigoNombre && horario.nombreMateria == grupo.nombreMateria && 
            horario.numPeriodo == grupo.numeroPeriodo && horario.anno ==grupo.anno )); //Escoge unicamente los horarios del grupo que corresponde
        setEvaluacionesFiltradas(dataEvaluaciones.filter(evaluacion=>evaluacion.codigoGrupo==grupo.codigoNombre && evaluacion.nombreMateria == grupo.nombreMateria
            && evaluacion.numPeriodo == grupo.numeroPeriodo && evaluacion.anno ==grupo.anno));

        (caso == "horario")?
            abrirCerrarModalHorario():abrirCerrarModalEvaluacion();
        
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGetGrupos();  
        peticionGetMatriculas();
        peticionGetPeriodos();
        peticionGetHorarios();
        peticionGetEvaluaciones();
        
    }, [])

    return (
        <div className="d-flex">
            <div className="col-sm-8">
                <br/>
                <h2 className="text-center offset-md-5 font-weight-bold">Mis Grupos</h2>
                <button onClick={()=>abrirCerrarModalFiltro()} className=" offset-md-3 btn btn-success">Filtrar</button>
                
                <table className="table table-hover mt-5 offset-md-3" >
                    <thead>
                        <tr>
                            <th>C??digo Grupo</th>
                            <th>Materia</th>
                            <th>Profesor</th>
                            <th>Per??odo</th>
                            <th>A??o</th>
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
                            <button className="btn btn-primary" onClick={()=>seleccionarGrupo(grupo,"horario")}
                            >Ver horario</button>{" "}
                        </td>
                        <td>
                            <button className="btn btn-warning" onClick={()=>seleccionarGrupo(grupo,"evaluacion")}
                            >Ver evaluaci??n</button>{" "}
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
                            <FloatingLabel controlId="floatingSelect" label="Per??odo">
                                <select id="rol" name="periodos" className="form-control" onChange={handlerOpcionNum}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     {
                                         filtroNumerosPeriodo().map((item,i)=>(
                                            <option key={"periodo"+i} value={item}>{item}</option>
                                         ))
                                     }
                                </select> 
                                <br/>
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingSelect" label="A??o">
                                <select id="role" name="annos" className="form-control" onChange={handlerOpcionAnno}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     {
                                         filtroAnnosPeriodo().map((item,i)=>(
                                             <option key={"anno"+i} value={item}>{item}</option>
                                         ))
                                     }
                                </select> 
                                   
                            </FloatingLabel>
                              
                          </Form>
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>gruposFiltrados()}>Aceptar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalFiltro()}
                        >Cancelar</Button>
                      </ModalFooter>
            </Modal>
            <Modal isOpen={modalHorario}>
                      <ModalHeader>Horario</ModalHeader>

                      <ModalBody>
                                             
                           {horariosFiltrados.map(horario=>(
                               <div>
                                   <label>{horario.dias}</label>
                                   <br/>
                                   <label>{horario.horaInicio} - {horario.horaFin}</label>
                               </div>

                               
                           ))}
                              
                         
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>abrirCerrarModalHorario()}>Aceptar</Button>
                      </ModalFooter>
            </Modal>
            <Modal isOpen={modalEvaluacion}>
                      <ModalHeader>Evaluaci??n</ModalHeader>

                      <ModalBody>
                          {
                              evaluacionesFiltradas.map(evaluacion=>(
                                  <label>{evaluacion.descripcion}</label>
                              ))
                          }
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>abrirCerrarModalEvaluacion()}>Aceptar</Button>
                      </ModalFooter>
            </Modal>
           
        </div>
    )
}
