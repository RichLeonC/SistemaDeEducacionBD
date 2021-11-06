import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import Cookies from 'universal-cookie';


export default function Evaluacion () {
    const baseURLEvaluciones = "https://localhost:44307/api/Evaluaciones";
    const baseURLEvalucionesEstudiante = "https://localhost:44307/api/Evaluacion_Estudiantes";
    const baseUrlEstudiantes =  "https://localhost:44307/api/estudiantes";
    const baseUrlGrupos = "https://localhost:44307/api/Grupos";
    const baseUrlUsuarios =  "https://localhost:44307/api/Usuarios";
    const baseUrlMatriculas = "https://localhost:44307/api/matriculas";

    const cookies = new Cookies();
    var cedula = cookies.get("cedula");// toma la cedula del profesor que haya iniciado sesión. 
    const [estudiantesF, setEstudiantesF]= useState([]);// estudiantes vinculados a un grupo
    const [modalGrupo,setModalGrupos] = useState(false); //Estado para el modal (la ventana de grupo)
    const [matriculas,setMatricula] = useState([]); //Estado para las matriculas
    const [estudiantes,setEstudiante] = useState([]); //Estado para los estudiantes
    const [gruposProfesor,setgruposProfesor] = useState([]); //Estado para los grupos que posee el profesor
    const [usuarios,setUsuarios] = useState([]); //Lista de usuriaos
    const [modalEvalucion,setmodalEvalucion] = useState(false); //Estado para el modal (la ventana de asistencia)
    const [modalNota,setmodalNota] = useState(false); //Estado para el modal (la ventana de asistencia)
    const [evaluacion, setEvaluacion] = useState ([]);// evaluacion ligada al grupo
    const [evaluacionEs, setEvaluacionES] = useState ([]);// evalucion del obtenida por el estudiante 
    const [grupoSeleccionado, setGrupoSeleccionado] = useState ([]);
    const [estudianteActual,setestudianteActual] = useState([]); // estudiante que se desea ingresar su asistencia
    const [evaluacionGrupo, setEvaluacionGrupo] = useState ([]);
    const [estudianteNota, setEstudianteNota] = useState({
        cedulaEstudiante : '',
        codigoGrupo : grupoSeleccionado,
        nombreMateria : '',
        numeroPeriodo: '',
        anno : '',
        notaObtenida: '',
        estado: ''
    });
   const [notaO, setNotaO] = useState ("");


    const peticionGetGrupos = async()=>{ //Realiza peticiones Get al backend de los grupos
        await axios.get(baseUrlGrupos+`/${cedula}`)
        .then(response=>{
            setgruposProfesor(response.data);
         }).catch(error=>{
            console.log(error);
         })
    }

    const peticionGetMatricula= async()=>{ //Realiza peticiones Get al backend de las matriculas
        await axios.get(baseUrlMatriculas)
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

    const peticionGetEvalucion = async()=>{ //Realiza peticiones Get al backend de las evaluciones 
        await axios.get(baseURLEvaluciones)
        .then(response=>{
            setEvaluacion(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    
    const peticionGetEvalucionEstudiantes = async()=>{ //Realiza peticiones Get al backend de los estudiantes
        await axios.get(baseURLEvalucionesEstudiante)
        .then(response=>{
            setEvaluacionES(response.data);
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


    const filtrarMatriculas = matriculas.filter(matricula=> matricula.codigoGrupo == (grupoSeleccionado));

    useEffect(() => { //Hace efecto la peticion
        peticionGetUsuarios();
        peticionGetGrupos();
        peticionGetEvalucionEstudiantes();
        peticionGetMatricula();
        peticionGetEstudiantes();
        peticionGetEvalucion();

        
    }, [])

    
    const handlerOpcion = e =>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        setGrupoSeleccionado(opcion);
       
        console.log(opcion);
        
        
       
    }



    const opciones = ()=> {

        setmodalEvalucion(!modalEvalucion);
    }

    const filtrarEstudiantes=()=>{ 
        const alumno  = estudiantes.filter(unEstudiantes=> filtrarMatriculas.find(matricula=> matricula.cedulaEstudiante == unEstudiantes.cedula));
        console.log(alumno);
        setEstudiantesF(usuarios.filter(usu=> alumno.find(estudiante=> estudiante.cedula == usu.cedula)));
    }
    
    const cerrarModalGrupos=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)
        setModalGrupos(!modalGrupo);
       
    }

    const mostrarLista= ()=>{
        peticionGetMatricula();
        filtrarEstudiantes();
        cerrarModalGrupos();
    }



    
    
    const abrirCerrarModalEvaluacion=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)
    //  console.log(handlerOpcion());
        console.log(filtrarMatriculas);
        const infoGrupo = gruposProfesor.filter(grupo=>grupo.codigoNombre == (grupoSeleccionado));
        setEvaluacionGrupo(evaluacion.filter(evaluacion=>infoGrupo.find(grupo=> grupo.codigoNombre == evaluacion.codigoGrupo)));
        setmodalEvalucion(!modalEvalucion);
    }
    
    const CerrarModalEvaluacion=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)
       
        setmodalEvalucion(!modalEvalucion);
    }
  

    const abrirCerrarNota=(estudiante)=>{

        setestudianteActual(estudiante);
        setmodalNota(!modalNota);
    }


    const peticionPost=async()=>{ //Realiza peticiones post al backend
        //  transformar();
        estudianteNota.cedulaEstudiante= estudianteActual.cedula;
        const infoGrupo = gruposProfesor.filter(grupo=>grupo.codigoNombre == (grupoSeleccionado));
        var iterator = infoGrupo.values();
        var estadoAlumno ="";
        const intNota = parseInt(notaO);
          if (intNota<70){
              estadoAlumno = "Reprobado"
          }
          if (intNota>=70){
            estadoAlumno = "Aprobado"
          }
          for(let grupo of iterator){
              
            estudianteNota.codigoGrupo = grupo.codigoNombre;
            estudianteNota.numPeriodo = parseInt(grupo.numeroPeriodo);
            estudianteNota.anno = parseInt(grupo.anno);
            estudianteNota.nombreMateria = grupo.nombreMateria;
            estudianteNota.notaObtenida= intNota;
            estudianteNota.estado = estadoAlumno;
          }
         
          
          
          await axios.post(baseURLEvalucionesEstudiante,estudianteNota) //Realizamos la peticion post, el matriculaSeleccionada se pasa como BODY
          .then(response=>{
            setEvaluacionES(evaluacionEs.concat(response.evaluacionEs)); //Agregamos al estado lo que responda la API
          }).catch(error=>{
              console.log(error);
          })
      }

      const cerrarpost=()=>{
        peticionPost();
        console.log(notaO);
        setmodalNota(!modalNota);

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
                        <th>Nota Estudiante</th>
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
             
                        <button className="btn btn-primary" onClick={()=>abrirCerrarNota(unEs)}>Nota</button>
                        </td> 
                     
                     </tr>  

                      
                     ))}                  
                    </tbody>
                </table>
                <br/>
                <button className=" met-5 offset-md-11  btn btn-warning" onClick={()=>abrirCerrarModalEvaluacion()} >Evaluacion</button>


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


            
            <Modal isOpen={modalEvalucion}>
                      <ModalHeader>Evaluación</ModalHeader>

                      <ModalBody>
                          {
                              evaluacionGrupo.map(evaluacion=>(
                                  <label>{evaluacion.descripcion}</label>
                              ))
                          }
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>opciones()}>Aceptar</Button>
                      </ModalFooter>
            </Modal>
        
        
        <Modal isOpen={modalNota}>
                  <ModalHeader>Nota Estudiante </ModalHeader>

                  <ModalBody>
                      {
                    <form>
                          <label>
                            Nota: 
                             <input type="text" name="notaO" onChange = {e => setNotaO(e.target.value)}/>
                            </label>
 
                    </form>
                      }
                  </ModalBody>

                  <ModalFooter>
                    <Button className="btn btn-primary"size="sm" onClick={()=> cerrarpost()} >Aceptar</Button>
                  </ModalFooter>
        </Modal>









 </div>


)
}