import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel, Row } from 'react-bootstrap';
import Cookies from 'universal-cookie';

//Componente que administra las evaluaciones del grupos el cual maneja el profesor.
export default function Evaluacion () {
    const baseURLEvaluciones = "https://localhost:44307/api/Evaluaciones";
    const baseURLEvalucionesEstudiante = "https://localhost:44307/api/Evaluacion_Estudiantes";
    const baseURLEvalucionesGrupoEstudiante = "https://localhost:44307/api/Evaluacion_Grupo_Estudiante";
    const baseUrlEstudiantes =  "https://localhost:44307/api/estudiantes";
    const baseUrlGrupos = "https://localhost:44307/api/Grupos";
    const baseUrlUsuarios =  "https://localhost:44307/api/Usuarios";
    const baseUrlMatriculas = "https://localhost:44307/api/matriculas";

    const cookies = new Cookies();
    var cedula = cookies.get("cedula");// toma la cedula del profesor que haya iniciado sesión.

    const [estudiantesF, setEstudiantesF]= useState([]);// estudiantes vinculados a un grupo
    const [modalGrupo,setModalGrupos] = useState(false); //Estado para el modal (la ventana de grupo)
    const [modalCambiarEvaluacion,setModalCambiarEvaluacion] = useState(false); //Estado para el modal (la ventana de grupo)
    const [matriculas,setMatricula] = useState([]); //Estado para las matriculas
    const [estudiantes,setEstudiante] = useState([]); //Estado para los estudiantes
    const [gruposProfesor,setgruposProfesor] = useState([]); //Estado para los grupos que posee el profesor
    const [usuarios,setUsuarios] = useState([]); //Lista de usuriaos
    const [modalEvalucion,setmodalEvalucion] = useState(false); //Estado para el modal (la ventana de asistencia)
    const [modalNota,setmodalNota] = useState(false); //Estado para el modal (la ventana de asistencia)
    const [evaluacion, setEvaluacion] = useState ([]);// evaluacion ligada al grupo
    const [evaluacionEs, setEvaluacionES] = useState ([]);// evalucion del obtenida por el estudiante 
    const [evaluacionGrupoEs, setEvaluacionGrupoES] = useState ([]);// evalucion del obtenida por el estudiante 
    const [grupoSeleccionado, setGrupoSeleccionado] = useState ([]);
    const [estudianteActual,setestudianteActual] = useState([]); // estudiante que se desea ingresar su asistencia
    const [evaluacionGrupo, setEvaluacionGrupo] = useState ([]);
    const [tipoEvalucion, setTipoEvalucion] = useState ("");
    const [estudianteNota, setEstudianteNota] = useState({
        rubro: '',
        cedulaEstudiante : '',
        codigoGrupo : grupoSeleccionado,
        nombreMateria : '',
        numeroPeriodo: '',
        anno : '',
        notaObtenida: ''
    });

    const [notaFinal, setNotaFinal] = useState({
        cedulaEstudiante : '',
        codigoGrupo : grupoSeleccionado,
        nombreMateria : '',
        numeroPeriodo: '',
        anno : '',
        notaObtenida: '',
        estado: '',
        descripcionEvaluacion : ''
    });


    
   const [notaO, setNotaO] = useState ("");
   const [nuevaDes, setNuevaDes] = useState("");


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

    const peticionGetEvalucionGrupoEstudiantes = async()=>{ //Realiza peticiones Get al backend de los estudiantes
        await axios.get(baseURLEvalucionesGrupoEstudiante)
        .then(response=>{
            setEvaluacionGrupoES(response.data);
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
        peticionGetEvalucionGrupoEstudiantes();

        
    }, [])

    
    const handlerOpcion = e =>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        setGrupoSeleccionado(opcion);
       
        console.log(opcion);
        
        
       
    }
    
    const handlerOpcion1 = e =>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        setTipoEvalucion(opcion);
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

    const todoEvaluado= ()=> {
        const contaEstu = evaluacionEs.filter(estudiante=> estudiante.cedulaEstudiante == (estudianteActual.cedula));

        if (contaEstu.length == evaluacion.length){
            peticionPost();
            return true;
        }
        else{
            return false;

        }
    }

    const abrirCerrarModalEvaluacion=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)
    
        const infoGrupo = gruposProfesor.filter(grupo=>grupo.codigoNombre == (grupoSeleccionado));
 
        console.log(evaluacion);
        setEvaluacionGrupo(evaluacion.filter(evaluacion=>infoGrupo.find(grupo=> grupo.codigoNombre == evaluacion.codigoGrupo)));
        console.log(evaluacion);
        setmodalEvalucion(!modalEvalucion);
    }
    
    const CerrarModalEvaluacion=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)
  
        setModalCambiarEvaluacion(!modalCambiarEvaluacion);
    }
  

    const abrirCerrarNota=(estudiante)=>{

        setestudianteActual(estudiante);
        setmodalNota(!modalNota);
    }




    const peticionPost=async()=>{ //Realiza peticiones post al backend
        //  transformar();
        notaFinal.cedulaEstudiante= estudianteActual.cedula;
        const infoGrupo = gruposProfesor.filter(grupo=>grupo.codigoNombre == (grupoSeleccionado));
        const contaEstu = evaluacionEs.filter(estudiante=> estudiante.cedulaEstudiante == (estudianteActual.cedula));
        var notaTotal = 0;
        for (let n of contaEstu){
            notaTotal = notaTotal + n.notaObtenida

        }
        var estadoAlumno= '';
        var iterator = infoGrupo.values();
          if (notaTotal<70){
              estadoAlumno = "Reprobado"
          }
          if (notaTotal>=70){
            estadoAlumno = "Aprobado"
          }
          for(let grupo of iterator){
              
            notaFinal.codigoGrupo = grupo.codigoNombre;
            notaFinal.numPeriodo = parseInt(grupo.numeroPeriodo);
            notaFinal.anno = parseInt(grupo.anno);
            notaFinal.nombreMateria = grupo.nombreMateria;
            notaFinal.notaObtenida= notaTotal;
            notaFinal.estado = estadoAlumno;
            notaFinal.descripcionEvaluacion = '';
          }
         
          
          
          await axios.post(baseURLEvalucionesGrupoEstudiante,notaFinal) //Realizamos la peticion post, el matriculaSeleccionada se pasa como BODY
          .then(response=>{
            setEvaluacionGrupoES(evaluacionGrupoEs.concat(response.evaluacionGrupoEs)); //Agregamos al estado lo que responda la API
          }).catch(error=>{
              console.log(error);
          })
      }

      const peticionPostRubroNota=async()=>{ //Realiza peticiones post al backend
        //  transformar();
        estudianteNota.cedulaEstudiante= estudianteActual.cedula;
        const infoGrupo = gruposProfesor.filter(grupo=>grupo.codigoNombre == (grupoSeleccionado));
        
        var iterator = infoGrupo.values();
       
        const intNota = parseInt(notaO);
        
          for(let grupo of iterator){
              
            estudianteNota.codigoGrupo = grupo.codigoNombre;
            estudianteNota.numPeriodo = parseInt(grupo.numeroPeriodo);
            estudianteNota.anno = parseInt(grupo.anno);
            estudianteNota.nombreMateria = grupo.nombreMateria;
            estudianteNota.notaObtenida= intNota;
            estudianteNota.rubro= tipoEvalucion;
           
          }
         
          
          
          await axios.post(baseURLEvalucionesEstudiante,estudianteNota) //Realizamos la peticion post, el matriculaSeleccionada se pasa como BODY
          .then(response=>{
            setEvaluacionES(evaluacionEs.concat(response.evaluacionEs)); //Agregamos al estado lo que responda la API
          }).catch(error=>{
              console.log(error);
          })
      }

      const cerrarpost=()=>{
        peticionPostRubroNota();
        todoEvaluado();
        console.log(notaO);
        setmodalNota(!modalNota);

      }

      const cerrarpost1=()=>{
     
        setmodalNota(!modalNota);

      }


   

 

return (
 
    <div className= "col-sm-8">
          <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Evaluacion por Grupos</h2>
            <br/>
    <div className = "container offset-md-4">
        <div className = "row">
            <div className = "col"> 
                <button onClick={()=>abrirModalGrupos()} className="btn btn-success">Grupos</button>
            </div>
            <div className = "col">
                 <button className="  btn btn-warning" onClick={()=>abrirCerrarModalEvaluacion()} >Evaluacion</button>        
            </div>
         
        </div>
    </div>
            <table className="table table-hover mt-5 offset-md-3" >
                <thead>
                    <tr>
                        <th>Cedula Estudiante</th>
                        <th>Nombre</th>
                        <th>Apellido 1</th>
                        <th>Apellido 2</th>
                        <th>Ingresar</th>
                   

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
                      <Form>    
                            <FloatingLabel controlId="floatingSelect" label="Evaluacion">
                                <select id="rol" name="evaluaciones" className="form-control" onChange={handlerOpcion1}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                       
                                  {
                                    evaluacion.map((item,i)=>(
                                      
                                      <option key={"evaluacion"+i} value={item.rubro}>{item.rubro}</option>
                                      
                                    ))
                                  }
                                </select> 
                                     
                              </FloatingLabel>
                              </Form>    
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
                    <Button className="btn btn-danger"size="sm" onClick={()=> cerrarpost1()} >Cancelar</Button>
                  </ModalFooter>
        </Modal>


  
        <Modal isOpen={modalCambiarEvaluacion}>
                  <ModalHeader>Cambiar Evalucion </ModalHeader>

                  <ModalBody>
                      {
                    <form>
                          <label>
                            Nueva Evaluacion: 
                             <input type="text" name="nuevaDes" onChange = {e => setNuevaDes(e.target.value)}/>
                            </label>
 
                    </form>
                      }
                  </ModalBody>

                  <ModalFooter>
                    <Button className="btn btn-primary"size="sm" onClick={()=>CerrarModalEvaluacion()} >Aceptar</Button>
                  </ModalFooter>
        </Modal>






 </div>


)
}