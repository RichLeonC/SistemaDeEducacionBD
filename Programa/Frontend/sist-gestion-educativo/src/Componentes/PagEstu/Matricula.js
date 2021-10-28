import React,{Component,useState,useEffect} from 'react';

import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';


export default function Matricula() {
    const baseUrl = "https://localhost:44329/api/matriculas";
    const baseUrlGrupos = "https://localhost:44329/api/Grupos";
    const [data,setData] = useState([]); //Estado para las matriculas
    const [dataG,setDataG] = useState([]); //Estado para los grupos
    const [grupoSeleccionado,setGrupoSeleccionado] = useState([]);
    const [modalInsertar,setModalInsertar] = useState(false);
    const [matriculaSeleccionada,setMatriculaSeleccionada] = useState({
        idMatricula: '',
        costeMatricula:'5000',
        fechaCreacion:'2021/4/4',
        cedulaEstudiante:'1010',
        codigoGrupo:'',
        numPeriodo:'',
        anno:'',
        nombreMateria:''



    })

    const handleChange=e=>{ //Gurdamos lo que el usuario digita en los inputs
        const {name,value}=e.target;
        setMatriculaSeleccionada({
            ...matriculaSeleccionada,
            [name]:value
        });
        console.log(matriculaSeleccionada);
    }

    const handlerOpcion = e=>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        setGrupoSeleccionado(opcion);
        console.log(opcion);
     
        
    }

    const abrirCerrarModalInsertar=()=>{ //Cambia el estado del modal (abierto o cerrado)

        setModalInsertar(!modalInsertar);

    }
    
    const peticionGet = async()=>{ //Realiza peticiones Get al backend Matriculas
        await axios.get(baseUrl)
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

    const gruposPermitidos = dataG.filter(grupo=>grupo.estado == ("Abierto")); //Filtra los grupos
    const grupoEscogido = gruposPermitidos.filter(grupo=>grupo.codigoNombre == (grupoSeleccionado));
    
    useEffect(() => { //Hace efecto la peticion
        peticionGet();
        peticionGetG();

        
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
                                <select id="role" name="grupos" className="form-control" onChange={handlerOpcion}>
                                    <option value ={-1} defaultValue disabled>Opciones</option>
                                     
                                {
                                  gruposPermitidos.map((item,i)=>(
                                    
                                    <option key={"grupo"+i} values={item.codigoNombre}>{item.codigoNombre}</option>
                                    
                                  ))
                                }
                                </select> 
                                   
                            </FloatingLabel>
                            {
                                grupoEscogido.map(grupo=>(
                                    <label>{grupo.numeroPeriodo}</label>
                                ))
                            }
                          </Form>
                      </ModalBody>
                      <br/>
                      <Button className="btn btn-primary"size="sm" onClick={()=>peticionPost()}>Insertar</Button>
                      <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
            </Modal>
  
    </div>
    
    )
}
