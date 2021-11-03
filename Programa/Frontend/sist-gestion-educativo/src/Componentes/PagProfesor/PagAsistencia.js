import React,{Component,useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { Card,ListGroup,Table} from 'react-bootstrap';

export default function PagAsistencia() {
    const cookies = new Cookies();
    const baseUrlMatriculas = "https://localhost:44307/api/matriculas";
    const baseUrlEstudiantes =  "https://localhost:44307/api/estudiantes";
    const baseUrlGrupos = "https://localhost:44307/api/Grupos";
    const baseUrlUsuarios =  "https://localhost:44307/api/Usuarios";
    const [matriculas,setMatricula] = useState([]); //Estado para las matriculas
    const [estudiantes,setEstudiante] = useState([]); //Estado para los estudiantes
    const [gruposProfesor,setgruposProfesor] = useState([]); //Estado para los grupos que posee el profesor
    const [usuarios,setUsuarios] = useState([]); //Estado para los grupos que posee el profesor
    const [modalGrupo,setModalGrupos] = useState(false); //Estado para el modal (la ventana de grupo)
    const [grupoSeleccionado,setGrupoSeleccionado] = useState([]); //Estado para el codigo de grupo que se escoje en select
  
    
    const cokies = new Cookies();
    var cedula = cokies.get("cedula");// toma la cedula del profesor que haya iniciado sesión. 


    
    const peticionGetGrupos = async()=>{ //Realiza peticiones Get al backend de los grupos
        await axios.get(baseUrlGrupos+`/${cedula}`)
        .then(response=>{
            setgruposProfesor(response.data);
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


    const abrirCerrarModalGrupos=()=>{ //Cambia el estado del modal de insertar (abierto o cerrado)

        setModalGrupos(!modalGrupo);
        peticionGetGrupos();

    }

    const handlerOpcion = e=>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        setGrupoSeleccionado(opcion);
        console.log(opcion);
     
        
    }

    const Checkbox = props => (
        <input type="checkbox" {...props} />
      )


    const filtrarEstudiantes=()=>{
        peticionGetMatricula();
        peticionGetEstudiantes();
        peticionGetUsuarios();
        setEstudiante(estudiantes.filter(unEstudiantes=> unEstudiantes.cedula == matriculas.cedulaEstudiante))
        console.log(estudiantes);
        setUsuarios(usuarios.filter(usu => usu.cedula == matriculas.cedulaEstudiante));

    }

    const mostrarLista= ()=>{
        filtrarEstudiantes();
        abrirCerrarModalGrupos();
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGetUsuarios();
      

        
    }, [])

    return (
        <div>
             <button onClick={()=>abrirCerrarModalGrupos()} className=" offset-md-0 btn btn-success">Grupos</button>
                <table className="table table-hover mt-5 offset-md-0" >
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
                    {
                      usuarios.map(unEs=>(
                        <tr  key ={unEs.cedula}>
                        <td>{unEs.cedula}</td>
                        <td>{unEs.nombre}</td>
                        <td>{unEs.apellido1}</td>
                        <td>{unEs.apellido2}</td>
                        <td>
                            <Checkbox></Checkbox>
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
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalGrupos()}
                        >Cancelar</Button>
                      </ModalFooter>
            </Modal>







        </div>


    )
  
    
}