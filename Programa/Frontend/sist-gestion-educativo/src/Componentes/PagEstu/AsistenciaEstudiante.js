
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import Cookies from 'universal-cookie';
//Ventana que muestra la asistencia de los estudiantes por curso
export default function AsistenciaEstudiante() {
    const cookies = new Cookies();
    const baseUrl = "https://localhost:44329/api/Asistencia_Estudiantes/"+cookies.get("cedula")+"/1";
    const baseUrlPeriodos = "https://localhost:44329/api/periodos";
    const baseUrlGrupos = "https://localhost:44329/api/grupos";
    const baseUrlMatriculas = "https://localhost:44329/api/matriculas/"+cookies.get("cedula")+"/1";
   

    const [dataAsistencia,setDataAsistencia] = useState([]);
    const [dataPeriodos,setDataPeriodos] = useState([]);
    const [dataMatriculas,setDataMatriculas] = useState([]);
    const [dataGrupos,setDataGrupos] = useState([]); //Estado para los grupos
    const [codigoSeleccionado,setCodigoSeleccionado] = useState([]);
    const [numSeleccionado, setNumSeleccionado] = useState([]);
    const [annoSeleccionado, setAnnoSeleccionado] = useState([]);
    const [modalFiltro,setModalFiltro] = useState(false);

    const abrirCerrarModalFiltro=()=>{ //Cambia el estado del modal de filtro (abierto o cerrado)
       
        setModalFiltro(!modalFiltro);
        if(modalFiltro == false){
            peticionGetAsistencia();
        }
    }

    const handlerOpcionCodigo=e=>{ 
        const opcion = e.target.value;
        setCodigoSeleccionado(opcion);
        console.log(codigoSeleccionado);
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

    const peticionGetAsistencia = async()=>{ //Realiza peticiones Get al backend Grupos
        await axios.get(baseUrl)
        .then(response=>{
            setDataAsistencia(response.data);
            
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

    function filtroNumerosPeriodo(){ //Omite los numeros de periodo duplicados
        let filtradosP = [];
        
        for(let periodo of dataPeriodos){
            if(!filtradosP.includes(periodo.numero)){
                filtradosP.push(periodo.numero);
            }
            
        }
        return filtradosP;

    }

    function filtroAnnosPeriodo(){ //Omite los numeros de año duplicados
        let filtradosA = [];

        for(let periodo of dataPeriodos){
            if(!filtradosA.includes(periodo.anno)){
                filtradosA.push(periodo.anno);
            }
            
        }
        return filtradosA;
    }

    function soloCodigos(){
        let codigos =[];
        for (let grupo of gruposEstudiante){
            codigos.push(grupo.codigoNombre);
        }
        return codigos;
    }

    const asistenciasFiltradas=()=>{
        abrirCerrarModalFiltro();
        console.log("Data asistencia antes: "+dataAsistencia);
        setDataAsistencia(dataAsistencia.filter(grupo=>grupo.numPeriodo == numSeleccionado && grupo.anno == annoSeleccionado && grupo.codigoGrupo==codigoSeleccionado));
        console.log("Data asistencia despues: "+dataAsistencia.map(data=>data.codigoGrupo));
    }

   
    
    
    const gruposEstudiante = dataGrupos.filter(grupo=>dataMatriculas.find(m=>m.codigoGrupo==grupo.codigoNombre));

    useEffect(() => { //Hace efecto la peticion
        peticionGetAsistencia();
       
        peticionGetPeriodos();
        peticionGetMatriculas();
        peticionGetGrupos();
    }, [])
    return (
        <div className="d-flex">
            <div className="col-sm-8">
            <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Mis Asistencias</h2>
            <button onClick={()=>abrirCerrarModalFiltro()} className=" offset-md-3 btn btn-success">Filtrar</button>
            <table className="table table-hover mt-5 offset-md-3" >
                    <thead>
                        <tr>
                            <th>Código Grupo</th>
                            <th>Materia</th>
                            <th>Período</th>
                            <th>Año</th>
                            <th>Fecha</th>
                            <th>Asistencia</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                      {dataAsistencia.map(asis=>(
                        <tr key ={asis.fecha}>
                        <td>{asis.codigoGrupo}</td>
                        <td>{asis.nombreMateria} </td>
                        <td>{asis.numPeriodo}</td>
                        <td>{asis.anno}</td>
                        <td>{asis.fecha}</td>
                        <td>{asis.asistencia?"Sí":"No"}</td>
                     </tr>  
                      ))}
                                                 
                    </tbody>
                  </table>

            </div>

            <Modal isOpen={modalFiltro}>
                      <ModalHeader>Filtrar Grupos</ModalHeader>

                      <ModalBody>
                          <Form> 
                          <FloatingLabel controlId="floatingSelect" label="Código de Grupo">
                                <select id="rol" name="codigo" className="form-control" onChange={handlerOpcionCodigo}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     {
                                         soloCodigos().map((item,i)=>(
                                            <option key={"codigo"+i} value={item}>{item}</option>
                                         ))
                                     }
                                </select> 
                                <br/>
                            </FloatingLabel>                      
                            <FloatingLabel controlId="floatingSelect" label="Período">
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

                            <FloatingLabel controlId="floatingSelect" label="Año">
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
                        <Button className="btn btn-primary"size="sm"onClick={()=>asistenciasFiltradas()} >Aceptar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalFiltro()}
                        >Cancelar</Button>
                      </ModalFooter>
            </Modal>
            
        </div>
    )
}
