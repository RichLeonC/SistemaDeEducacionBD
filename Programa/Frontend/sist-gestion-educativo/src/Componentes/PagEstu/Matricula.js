import React,{Component,useState,useEffect} from 'react';

import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';


export default function Matricula() {
    const baseUrl = "https://localhost:44329/api/matriculas";
    const [data,setData] = useState([]);
    const [modalInsertar,setModalInsertar] = useState(false);
    const [matriculaSeleccionada,setMatriculaSeleccionada] = useState({
        idMatricula: '',
      //  costeMatricula='',
      //  fechaCreacion:'',
      //  cedulaEstudiante:'',
        codigoGrupo:'',
      //  numPeriodo:'',
      //  anno:'',
      //  nombreMateria:''



    })

    const handleChange=e=>{ //Gurdamos lo que el usuario digita en los inputs
        const {name,value}=e.target;
        setMatriculaSeleccionada({
            ...matriculaSeleccionada,
            [name]:value
        });
        console.log(matriculaSeleccionada);
    }

    const abrirCerrarModalInsertar=()=>{ //Cambia el estado del modal (abierto o cerrado)
        console.log("Me estan dando click");
        setModalInsertar(!modalInsertar);
        console.log(modalInsertar);
    }
    
    const peticionGet = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionPost=async()=>{ //Realiza peticiones post al backend
        matriculaSeleccionada.idMatricula = parseInt(matriculaSeleccionada.idMatricula);
        delete matriculaSeleccionada.idMatricula; //Lo eliminamos porque se genera de forma autoincrementable
        await axios.post(baseUrl,matriculaSeleccionada) //Realizamos la peticion post, el matriculaSeleccionada se pasa como BODY
        .then(response=>{
            setData(data.concat(response.data)); //Agregamos al estado lo que responda la API
            abrirCerrarModalInsertar();
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGet();
        
    }, [])
    return (
   
    <div className="d-flex">
            <div className = "col-sm-8">
                <br/>
                <button onClick={()=>abrirCerrarModalInsertar()} className=" offset-md-3 btn btn-success">Realizar matricula</button>
                <table className="table table-hover mt-5 offset-md-3" >
                    <thead>
                        <tr>
                            <th>ID matricula</th>
                            <th>Coste matricula</th>
                            <th>Fecha Creación</th>
                            <th>Estudiante</th>
                            <th>Grupo</th>
                            <th>Período</th>
                            <th>Año</th>
                            <th>Materia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                      {data.map(matricula=>(
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
                            <button className="btn btn-danger">Eliminar</button>{" "}
                        </td>
                     </tr>  
                      ))}
                                                 
                    </tbody>
                  </table>

            </div>
            
            <Modal isOpen={modalInsertar}>
                      <ModalHeader>Realizar matricula</ModalHeader>

                      <ModalBody>
                          <Form>

                            <FloatingLabel controlId="floatingSelect" label="Código de grupo">

                                <select id="role" name="role" class="form-control" name="codigoGrupo" onChange={handleChange}>
                                    <option selected disabled>A</option>
                                     <option value='2'>A</option>
                                     <option value='2'>A</option>
                                </select>     
                            </FloatingLabel>
                              
                          </Form>
                      </ModalBody>
                      <br/>
                      <Button className="btn btn-primary"size="sm" onClick={()=>peticionPost()}>Insertar</Button>
                      <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
            </Modal>
  
    </div>
    
    )
}
