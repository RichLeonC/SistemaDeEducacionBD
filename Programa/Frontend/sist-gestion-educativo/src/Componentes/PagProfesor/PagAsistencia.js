import React,{Component,useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { Card,ListGroup,Table} from 'react-bootstrap';
import { RiFilterOffLine } from 'react-icons/ri';




export default function PagAsistencia() {
    const cookies = new Cookies();
    var cedula = cookies.get("cedula");// toma la cedula del profesor que haya iniciado sesión. 
    const baseUrlMatriculas = "https://localhost:44307/api/matriculas";
    const baseUrlEstudiantes =  "https://localhost:44307/api/estudiantes";
    const baseUrlGrupos = "https://localhost:44307/api/Grupos";
    const baseUrlUsuarios =  "https://localhost:44307/api/Usuarios";
    const baseUrlAsistencia =  "https://localhost:44307/api/Asistencia_Estudiantes";


    const [matriculas,setMatricula] = useState([]); //Estado para las matriculas
    const [estudiantes,setEstudiante] = useState([]); //Estado para los estudiantes
    const [gruposProfesor,setgruposProfesor] = useState([]); //Estado para los grupos que posee el profesor
    const [usuarios,setUsuarios] = useState([]); //Lista de usuriaos
    const [modalGrupo,setModalGrupos] = useState(false); //Estado para el modal (la ventana de grupo)
    const [modalAsistencia,setModalAsistencia] = useState(false); //Estado para el modal (la ventana de asistencia)
    const [grupoSeleccionado,setGrupoSeleccionado] = useState([]); //Estado para el codigo de grupo que se escoje en select
  
    const [estudiantesF, setEstudiantesF]= useState([]);// estudiantes vinculados a un grupo
    const [estudianteActual,setestudianteActual] = useState([]); // estudiante que se desea ingresar su asistencia
    const [asistencias, setAsistencias] = useState ([]); // Estado de la asistencia
    const [presente, setPresente] = useState ([]); // Estado de la asistencia
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}T00:00:00`; 
    const [guardarAsistencia,setGuardarAsistencia] = useState({ //Estado para guardar la info de la asistencia
        cedulaEstudiante: '',
        codigoGrupo: '',
        nombreMateria: '',
        anno: '',
        fechaAsistencia: date,
        asistencia: '',
    })
    const asiste = ["Si", "No"];
   
   

    
    const peticionGetGrupos = async()=>{ //Realiza peticiones Get al backend de los grupos
        await axios.get(baseUrlGrupos+`/${cedula}`)
        .then(response=>{
            setgruposProfesor(response.data);
         }).catch(error=>{
            console.log(error);
         })
    }

    const peticionAsistencia = async()=>{ //Realiza peticiones Get al backend de los grupos
        await axios.get(baseUrlAsistencia)
        .then(response=>{
            setAsistencias(response.data);
         }).catch(error=>{
            console.log(error);
         })
    }

    const peticionGetMatricula= async()=>{ //Realiza peticiones Get al backend de las matriculas
        await axios.get(baseUrlMatriculas+`/${grupoSeleccionado}`+ "/2")
        .then(response=>{
            setMatricula(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }


    const peticionGetEstudiantes = async()=>{ //Realiza peticiones Get al backend de los estudiantes
        await axios.get(baseUrlEstudiantes)
        .then(response=>{
            setEstudiante(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    
    const peticionGetUsuarios = async()=>{ //Realiza peticiones Get al backend de los estudiantes
        await axios.get(baseUrlUsuarios)
        .then(response=>{
            setUsuarios(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }



    const abrirModalGrupos=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)
        setModalGrupos(!modalGrupo);
       
        if (modalGrupo==false){
            setEstudiantesF([]); 
            
        }
    }


    const cerrarModalGrupos=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)
        setModalGrupos(!modalGrupo);
       
    }


    const abrirCerrarModalAistencia=(estudiante)=>{ //Cambia el estado del modal de insertar (abierto o cerrado)
    
        setestudianteActual(estudiante);
        setModalAsistencia(!modalAsistencia);

        
       
    }

    const infoGrupo =gruposProfesor.filter(grupo=> grupo.codigoNombre == grupoSeleccionado);

    const handlerOpcion = e=>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        setGrupoSeleccionado(opcion);
        console.log(opcion);
        console.log(infoGrupo);
        console.log(date);
     
        
    }

    
    const handlerOpcion1 = e=>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        setPresente(opcion);
        console.log(opcion);
      
    }
   
    const filtrarEstudiantes=()=>{ 
       
        peticionGetEstudiantes();
        peticionGetUsuarios();
        setEstudiante(estudiantes.filter(unEstudiantes=> unEstudiantes.cedula == matriculas.cedulaEstudiante)) 
        setEstudiantesF(usuarios.filter(usu=> estudiantes.find(estudiante=> estudiante.cedula == usu.cedula)));
    }


    const mostrarLista= ()=>{
        peticionGetMatricula();
        filtrarEstudiantes();
        cerrarModalGrupos();
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGetUsuarios();
        peticionGetGrupos();
        peticionAsistencia();
        
    }, [])


    const guardarPresentacia =()=>{
        peticionPost();
        setModalAsistencia(!modalAsistencia);
    }

   

    const peticionPost=async()=>{ //Realiza peticiones post al backend
      //  transformar();
      guardarAsistencia.cedulaEstudiante= estudianteActual.cedula;
        var iterator = infoGrupo.values();
        for(let grupo of iterator){
            
            guardarAsistencia.codigoGrupo = grupo.codigoNombre;
            guardarAsistencia.numPeriodo = parseInt(grupo.numeroPeriodo);
            guardarAsistencia.anno = parseInt(grupo.anno);
            guardarAsistencia.nombreMateria = grupo.nombreMateria;
            guardarAsistencia.asistencia = true;
        }
       
        
        
        await axios.post(baseUrlAsistencia,guardarAsistencia) //Realizamos la peticion post, el matriculaSeleccionada se pasa como BODY
        .then(response=>{
            setAsistencias(asistencias.concat(response.asistencias)); //Agregamos al estado lo que responda la API
        }).catch(error=>{
            console.log(error);
        })
    }


    return (
        <div className= "col-sm-8">
             <button onClick={()=>abrirModalGrupos()} className=" met-5 offset-md-3 btn btn-success">Grupos</button>
                <table className="table table-hover mt-5 offset-md-3" >
                    <thead>
                        <tr>
                            <th>Cedula Estudiante</th>
                            <th>Nombre</th>
                            <th>Apellido 1</th>
                            <th>Apellido 2</th>
                            <th>Asistencia</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                    {estudiantesF.map(unEs=>(
                        <tr  key ={unEs.cedula}>
                        <td>{unEs.cedula}</td>
                        <td>{unEs.nombre}</td>
                        <td>{unEs.apellido1}</td>
                        <td>{unEs.apellido2}</td>
                        <td>
             
                        <button className="btn btn-primary" onClick={()=>abrirCerrarModalAistencia(unEs)}>Asistencia</button>
                        </td>      
                        
                     </tr>  

                      
                     ))}                  
                    </tbody>
                  </table>

            
            
            <Modal isOpen={modalGrupo}>
                      <ModalHeader>Grupos Abiertos</ModalHeader>

                      <ModalBody>
                        <Form>                       
                        <FloatingLabel controlId="floatingSelect" label="Código de grupo">
                                <select id="rol" name="grupos" className="form-control" onChange={handlerOpcion}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     
                                {
                                  gruposProfesor.map((item,i)=>(
                                    
                                    <option key={"grupo"+i} value={item.codigoNombre}>{item.codigoNombre}</option>
                                    
                                  ))
                                }
                                </select> 
                                   
                            </FloatingLabel>
          
                        </Form>

                      </ModalBody> 

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>mostrarLista()}>Aceptar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>cerrarModalGrupos()}
                        >Cancelar</Button>
                      </ModalFooter>
            </Modal>
            
            <Modal isOpen={modalAsistencia}>
                      <ModalHeader>Asistencia</ModalHeader>

                      <ModalBody>
                        <Form>                       
                            <FloatingLabel controlId="floatingSelect" label="Presente">
                        <select id="rol" name="asistencia" className="form-control" onChange={handlerOpcion1}>
                        <option value ={-1} selected disabled>Asistencia</option>
                 
                         {
                              asiste.map((item,i)=>(
                
                             <option key={"asistencia"+i} value={item}>{item}</option>
                
                                  ))
                        }
                         </select> 
               
                            </FloatingLabel>
          
                        </Form>

                      </ModalBody> 

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>guardarPresentacia()}>Aceptar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalAistencia()}
                        >Cancelar</Button>
                      </ModalFooter>
            </Modal>
            





            <br/>
            <button  className=" met-5 offset-md-11 btn btn-success">Guardar</button>
            
        </div>


    )
  
    
}