import React,{useState,useEffect} from 'react';

import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import Cookies from 'universal-cookie';


//Componente que administra las matriculas, permite crear, eliminar, y crea los cobros respectivos
export default function Matricula() {

    const baseUrl = "https://localhost:44329/api/matriculas";
    const baseUrlGrupos = "https://localhost:44329/api/Grupos";
    const baseUrlMaterias= "https://localhost:44329/api/materias";
    const baseUrlEstudiantes = "https://localhost:44329/api/estudiantes";
    const baseUrlCobros = "https://localhost:44329/api/cobros";
   
    const cookies = new Cookies();
    const [data,setData] = useState([]); //Estado para las matriculas
    const [dataG,setDataG] = useState([]); //Estado para los grupos
    const [dataMateria,setDataMateria] = useState([]);//Estado para las materias
    const [dataEstudiante,setDataEstudiante] = useState([]);//Estado para el estudiante actual
    const [grupoSeleccionado,setGrupoSeleccionado] = useState([]); //Estado para el codigo de grupo que se escoje en select
    const [modalInsertar,setModalInsertar] = useState(false); //Estado para el modal (la ventana de insertar)
    const [modalEliminar,setModalEliminar] = useState(false);
    const [modalExito,setModalExito] = useState(false);
    const [matriculaSeleccionada,setMatriculaSeleccionada] = useState({ //Estado para guardar la info de la matricula
        idMatricula: '',
        costeMatricula: 5000,
        fechaCreacion:"2021-10-28T00:00:00",
        cedulaEstudiante: cookies.get("cedula"),
        codigoGrupo:'',
        numPeriodo:'',
        anno:'',
        nombreMateria:''



    })
    const [dataIdMatricula,setDataIdMatricula] = useState([]);

    const [cobro,setCobro]=useState({
        consecutivo:'',
        idMatricula:'',
        estado:'Pendiente'
    })

   
    const handlerOpcion = e=>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        setGrupoSeleccionado(opcion);
        console.log(opcion);
     
        
    }


    const abrirCerrarModalInsertar=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)
       
        setModalInsertar(!modalInsertar);
        
    }

    const abrirCerrarModalEliminar=()=>{ //Cambia el estado del modal de eliminar(abierto o cerrado)
        
        setModalEliminar(!modalEliminar);
        

    }

    const abrirCerrarModalExito=()=>{ //Cambia el estado del modal de eliminar(abierto o cerrado)
        
        setModalExito(!modalExito);
        console.log(modalExito);
        if(modalExito==false){
            abrirCerrarModalInsertar();
           
        }
        if(modalExito == true){
            peticionPostCobro();
        }
    }

    const insertarMatriculaCobro=()=>{
        peticionPost();
        abrirCerrarModalExito();
    }
    
    const peticionGet = async()=>{ //Realiza peticiones Get al backend Matriculas
        await axios.get(baseUrl+"/"+cookies.get("cedula")+"/1")
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetG = async()=>{ //Realiza peticiones Get al backend Grupos
        await axios.get(baseUrlGrupos)
        .then(response=>{
            setDataG(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetMaterias = async()=>{ //Realiza peticiones Get al backend Materias
        await axios.get(baseUrlMaterias)
        .then(response=>{
            setDataMateria(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetEstudiante = async()=>{ //Realiza peticiones Get al backend Materias
        await axios.get(baseUrlEstudiantes+"/"+cookies.get("cedula"))
        .then(response=>{
            setDataEstudiante(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    
   

    const peticionPost=async()=>{ //Realiza peticiones post al backend
        matriculaSeleccionada.costeMatricula = 5000;
        var iterator = grupoEscogido.values();
        for(let grupo of iterator){
            matriculaSeleccionada.codigoGrupo = grupo.codigoNombre;
            matriculaSeleccionada.numPeriodo = parseInt(grupo.numeroPeriodo);
            matriculaSeleccionada.anno = parseInt(grupo.anno);
            matriculaSeleccionada.nombreMateria = grupo.nombreMateria;
        }
        const materiaCorrespondiente = dataMateria.filter(materia=>materia.nombre == (matriculaSeleccionada.nombreMateria));
        iterator = materiaCorrespondiente.values();
        for(let materia of iterator){
            
             matriculaSeleccionada.costeMatricula = (matriculaSeleccionada.costeMatricula+materia.precio);
            
        }
        
        delete matriculaSeleccionada.idMatricula; //Lo eliminamos porque se genera de forma autoincrementable
        
        await axios.post(baseUrl,matriculaSeleccionada) //Realizamos la peticion post, el matriculaSeleccionada se pasa como BODY
        .then(response=>{
            setData(data.concat(response.data)); //Agregamos al estado lo que responda la API
            setDataIdMatricula(response.data);
            
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionPostCobro=async()=>{
        delete cobro.consecutivo;
        cobro.idMatricula = (dataIdMatricula.idMatricula);
        await axios.post(baseUrlCobros,cobro) //Realizamos la peticion post, el matriculaSeleccionada se pasa como BODY
        
    }

    const peticionDelete=async()=>{
        await axios.delete(baseUrlCobros+"/"+matriculaSeleccionada.idMatricula);
        await axios.delete(baseUrl+"/"+matriculaSeleccionada.idMatricula)
        .then(response=>{
            setData(data.filter(matricula=>matricula.idMatricula!==response.data)); //Guarda en el estado, los que no se eliminaron
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    const gruposPermitidos = dataG.filter(grupo=>grupo.estado == ("Abierto") && grupo.grado == (dataEstudiante.grado)); //Filtra los grupos
    const grupoEscogido = gruposPermitidos.filter(grupo=>grupo.codigoNombre == (grupoSeleccionado)); //Escogemos el grupo marcado
    

    
    const seleccionarMatricula=(matricula,caso)=>{
        setMatriculaSeleccionada(matricula);
        (caso=="Eliminar")&&
        abrirCerrarModalEliminar();
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGet();
        peticionGetG();
        peticionGetMaterias();
        peticionGetEstudiante();
        
        
    }, [])
    return (
   
    <div className="d-flex">
            <div className = "col-sm-8">
                <br/>
                <h2 className="text-center offset-md-5 font-weight-bold">Matr??culas</h2>
                <button onClick={()=>abrirCerrarModalInsertar()} className=" offset-md-3 btn btn-success">Realizar matr??cula</button>
                <table className="table table-hover mt-5 offset-md-3" >
                    <thead>
                        <tr>
                            <th>ID matricula</th>
                            <th>Coste matr??cula</th>
                            <th>Fecha Creaci??n</th>
                            <th>Estudiante</th>
                            <th>Grupo</th>
                            <th>Per??odo</th>
                            <th>A??o</th>
                            <th>Materia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                      data.map(matricula=>(
                        <tr key ={matricula.idMatricula}>
                        <td>{matricula.idMatricula}</td>
                        <td>{matricula.costeMatricula} </td>
                        <td>{matricula.fechaCreacion}</td>
                        <td>{matricula.cedulaEstudiante}</td>
                        <td>{matricula.codigoGrupo}</td>
                        <td>{matricula.numPeriodo}</td>
                        <td>{matricula.anno}</td>
                        <td>{matricula.nombreMateria}</td>
                        <td>
                            <button className="btn btn-danger" onClick={()=>seleccionarMatricula(matricula,"Eliminar")}
                            >Eliminar</button>{" "}
                        </td>
                     </tr>  
                      ))}
                                                 
                    </tbody>
                  </table>

            </div>
            
            <Modal isOpen={modalInsertar}>
                      <ModalHeader>Realizar matr??cula</ModalHeader>

                      <ModalBody>
                          <Form>                       
                            <FloatingLabel controlId="floatingSelect" label="C??digo de grupo">
                                <select id="rol" name="grupos" className="form-control" onChange={handlerOpcion}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     
                                {
                                  gruposPermitidos.map((item,i)=>(
                                    
                                    <option key={"grupo"+i} value={item.codigoNombre}>{item.codigoNombre}</option>
                                    
                                  ))
                                }
                                </select> 
                                   
                            </FloatingLabel>
                              
                          </Form>
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>insertarMatriculaCobro()}>Insertar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalInsertar()}
                        >Cancelar</Button>
                      </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>

                <ModalBody>
                   ??Est??s seguro que deseas eliminar la matr??cula  {matriculaSeleccionada.idMatricula}?     
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-danger"size="sm" onClick={()=>peticionDelete()}>S??</Button>
                    <Button className="btn btn-secondary" size="sm" onClick={()=>abrirCerrarModalEliminar()}
                    >No</Button>
                </ModalFooter>
            </Modal>
            
             <Modal isOpen={modalExito}>

                <ModalBody>
                   La matr??cula se ha realizado correctamente     
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-primary"size="sm" onClick={()=>abrirCerrarModalExito()}>Aceptar</Button>
                </ModalFooter>
            </Modal>
            
  
    </div>
    
    )
}
