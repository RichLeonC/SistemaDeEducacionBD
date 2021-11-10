import React,{Component,useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'



//Componente que lista los grupos del profesor y permite cerrarlos
export default function PagGrupoMateria() {
    const baseUrlGrupo = "https://localhost:44329/api/Grupos";
    const baseURLEvalucionesEstudiante = "https://localhost:44329/api/Evaluacion_Estudiantes";
    const baseUrlEstudiantes =  "https://localhost:44329/api/estudiantes";
    const baseUrlUsuarios =  "https://localhost:44329/api/Usuarios";
    const baseUrlMatriculas = "https://localhost:44329/api/matriculas";

    const[modalAviso, setModalAviso]= useState(false);
    const [estudiantesF, setEstudiantesF]= useState([]);// estudiantes vinculados a un grupo
    const [data,setData] = useState([]);
    const [matriculas,setMatricula] = useState([]); //Estado para las matriculas
    const [estudiantes,setEstudiante] = useState([]); //Estado para los estudiantes
    const [usuarios,setUsuarios] = useState([]); //Lista de usuriaos
    const [evaluacion, setEvaluacion] = useState ([]);// evaluacion ligada al grupo
    const [grupoSeleccionado, setGrupoSeleccionado] = useState([]);
    const [TodosEvaluados, setTodosEvaluados ] = useState(false);
    const [grupoCerrado, setGrupoCerrado] = useState ({
        codigoNombre: '',
        nombreMateria: '',
        cedulaProfesor: '',
        numeroPeriodo: '',
        anno: '',
        grado: '',
        cupo: '',
        estado: '',
    })

    
    const cookies = new Cookies();

    var cedula = cookies.get("cedula");// toma la cedula del profesor que haya iniciado sesión. 


    const peticionGet = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrlGrupo+`/${cedula}`)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

        
    const peticionGetEvalucionEstudiantes = async()=>{ //Realiza peticiones Get al backend de los estudiantes
        await axios.get(baseURLEvalucionesEstudiante)
        .then(response=>{
            setEvaluacion(response.data);
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

    const peticionGetMatricula= async()=>{ //Realiza peticiones Get al backend de las matriculas
        await axios.get(baseUrlMatriculas)
        .then(response=>{
            setMatricula(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }



    const cerrarGrupo= grupo =>{
        const grupoElegido = data.filter(grup => grup.codigoNombre == (grupo));

       // console.log(grupoElegido);

        var iterator = grupoElegido.values();
        grupoCerrado.cedulaProfesor = parseInt(cedula);
        for(let grupos of iterator){
            
            grupoCerrado.cupo = parseInt(grupos.cupo);
            grupoCerrado.codigoNombre = grupos.codigoNombre;
            grupoCerrado.numeroPeriodo =parseInt( grupos.numeroPeriodo);
            grupoCerrado.anno = parseInt(grupos.anno);
            grupoCerrado.nombreMateria = grupos.nombreMateria;
            grupoCerrado.grado = parseInt(grupos.grado);
            grupoCerrado.estado = grupos.estado;
           
           
        }

       var cerrar = filtrarGrupos(grupo);

       if (cerrar){
           peticionPut();
       }
    }

    const peticionPut=async()=>{ //Realiza peticiones post al backend
       
          
            grupoCerrado.estado="Cerrado";
          await axios.put(baseUrlGrupo+'/'+grupoCerrado.codigoNombre+'/'+grupoCerrado.nombreMateria+'/'+
          grupoCerrado.numeroPeriodo +'/'+ grupoCerrado.anno ,grupoCerrado) //Realizamos la peticion post, el matriculaSeleccionada se pasa como BODY
          .then(response=>{
                var respuesta = response.data;
                var dataAuxiliar= data;
                dataAuxiliar.map(cerrar =>{if(
                    cerrar.codigoNombre == grupoCerrado.codigoNombre &&
                    cerrar.nombreMateria == grupoCerrado.nombreMateria &&
                     cerrar.numeroPeriodo == grupoCerrado.numeroPeriodo 
                    && cerrar.anno == grupoCerrado.anno)
                    cerrar.estado= "Cerrado";

                })
                alert("Cerrado Exitosa");

          }).catch(error=>{
              console.log(error);    

          })
      }


    const filtrarGrupos= (grupoSeleccionado)=>{
        const filtrarMatriculas = matriculas.filter(matricula=> matricula.codigoGrupo == (grupoSeleccionado));
        const filtrarEvaluciones  = evaluacion.filter(unaEvaluacion=> unaEvaluacion.codigoGrupo == (grupoSeleccionado));
        const filtrarCedulasE = [];
        const filtrarCedulasM = [];

        for(let estudianteEvaluado of filtrarEvaluciones){
            if(!filtrarCedulasE.includes(estudianteEvaluado.cedulaEstudiante)){
                filtrarCedulasE.push(estudianteEvaluado.cedulaEstudiante);
            }         
        }

        for(let estudianMatriculado of filtrarMatriculas){
            if(!filtrarCedulasM.includes(estudianMatriculado.cedulaEstudiante)){
                filtrarCedulasM.push(estudianMatriculado.cedulaEstudiante);
            }         
        }
       
       // console.log(filtrarCedulasM);
       // console.log(filtrarCedulasE);


        for(let n of filtrarMatriculas){
            if(!filtrarCedulasE.includes(n.cedulaEstudiante)){
                CerrarModalAviso()
                return false;
            }           
        }

        return true;
    }




    
    useEffect(() => { //Hace efecto la peticion
        peticionGet();
        peticionGetEvalucionEstudiantes();
        peticionGetUsuarios();
        peticionGetEstudiantes();
        peticionGetMatricula();

    }, [])

    

     
    const CerrarModalAviso=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)
       
        setModalAviso(!modalAviso);
    }
  
    

    return (//Metodo que despliega la tabla de los grupos asignados al profesor que inició seseión
   
        <div className="d-flex">
                <div className = "col-sm-8">
                    <br/>
                    <h2 className="text-center offset-md-5 font-weight-bold">Grupos del Profesor</h2>
                    
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
                                <th>Cerrar Grupo</th>
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
                            <tb><button className="btn btn-primary"size="sm" onClick= {()=> cerrarGrupo(grupo.codigoNombre)}>Cerrar</button></tb>
                            
                         </tr>  
                          ))}
                                                     
                        </tbody>
                      </table>

                   
            <Modal isOpen={modalAviso}>

                <ModalBody>
                No puede cerrar el grupo, no todos los estudiantes tienen nota   
                    </ModalBody>
                <ModalFooter>
                 <Button className="btn btn-danger"size="sm" onClick={()=>CerrarModalAviso()}>Aceptar</Button>
                </ModalFooter>
                </Modal>




                </div>
                </div>
                )}