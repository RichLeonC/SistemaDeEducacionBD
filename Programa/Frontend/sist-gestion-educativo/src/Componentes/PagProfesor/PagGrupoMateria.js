import React,{Component,useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';




export default function PagGrupoMateria() {
    const baseUrlGrupo = "https://localhost:44307/api/Grupos";
    const baseURLEvalucionesEstudiante = "https://localhost:44307/api/Evaluacion_Estudiantes";
    const baseUrlEstudiantes =  "https://localhost:44307/api/estudiantes";
    const baseUrlUsuarios =  "https://localhost:44307/api/Usuarios";
    const baseUrlMatriculas = "https://localhost:44307/api/matriculas";
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
        var grupoElegido = data.find(grup => grup.codigoNombre == grupo);
        console.log(grupoElegido);
        filtrarGrupos(grupo);

    }


    const filtrarGrupos= (grupoSeleccionado)=>{
        const filtrarMatriculas = matriculas.filter(matricula=> matricula.codigoGrupo == (grupoSeleccionado));
        const filtrarEvaluciones  = evaluacion.filter(unaEvaluacion=> unaEvaluacion.codigoGrupo == (grupoSeleccionado));




       console.log(filtrarMatriculas);
       console.log(filtrarEvaluciones);

    }


    
    useEffect(() => { //Hace efecto la peticion
        peticionGet();
        peticionGetEvalucionEstudiantes();
        peticionGetUsuarios();
        peticionGetEstudiantes();
        peticionGetMatricula();

    }, [])

    

    
    

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

                   
                </div>
                </div>
                )}