import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import {Bar} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';


export default function InfoAcademica(){
    const baseUrlInfoAcademica = 'https://localhost:44307/api/InfoAcademica';
    const baseUrlEstudiante =  'https://localhost:44307/api/Estudiante_Vistas';

    const [datainfoEstudiante, setinfoEstudiante]= useState([]);
    const [datalInfoAcademica,setlInfoAcademica] = useState([]);
    const [datalListado,setdatalListado] = useState([]);

    const [modalFiltro,setModalFiltro] = useState(false);
    const [estudiante, setEstudiante] = useState([]);
 

    const peticionGetInfo = async(cedulaE)=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlInfoAcademica + "/" + cedulaE + "/1")
        .then(response=>{
            setlInfoAcademica(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetListado = async(cedula)=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlInfoAcademica + "/" + cedula + "/2")
        .then(response=>{
            setdatalListado(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }


    
    const peticionGetEstudiantes = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlEstudiante)
        .then(response=>{
            setinfoEstudiante(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const abrirCerrarModalFiltro=()=>{
        setModalFiltro(!modalFiltro);

    }

    const handlerOpcion = e =>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        intermedio (opcion);
        console.log(opcion);
        setEstudiante(opcion);
   
    }

 
    

    const intermedio = nombre =>{
        
        const infoP = datainfoEstudiante.find(estudiante=> estudiante.nombreCompleto == nombre);
        peticionGetInfo(infoP.cedula);
        peticionGetListado(infoP.cedula)
       
      
       
    }


    useEffect(() => { //Hace efecto la peticion
  
        peticionGetEstudiantes();
    }, [])


    return (
        <div  className="col-sm-8">
            <br/>
            <h2 className="offset-md-4 font-weight-bold">Promedio ponderado por estudiante: {estudiante}</h2>
              <Button className="btn btn-primary mt-4 offset-md-1 "size="sm" onClick={()=>abrirCerrarModalFiltro()} >Estudiantes</Button>
              <table className="table table-hover mt-5 offset-md-3"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Ponderado</th>
                <th>TotalGrupos</th>
                <th>Canti/Aprobados</th>
                <th>Canti/Reprobados</th>
                <th>Promedio/Aprobados</th>
                <th>Promedio/Reprobados</th>
                </tr>
            </thead>
            <tbody>
                {
                    datalInfoAcademica.map(info=>(
                        <tr>
                        <td>{info.ponderado}</td>
                        <td>{info.cantidadGrupos}</td>
                        <td>{info.cantidadAprobados}</td>
                        <td>{info.cantidadReprobados}</td>
                        <td>{info.promedioAprobadas}</td>
                        <td>{info.promedioReprobadas}</td>
                        </tr>
                    ))
                }
               
                
            </tbody>
        </table>

        <table className="table table-hover mt-5 offset-md-3"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>CodigoGrupo</th>
                <th>Nota</th>
                </tr>
            </thead>
            <tbody>
                {
                    datalListado.map(info=>(
                        <tr>
                        <td>{info.codigoGrupo}</td>
                        <td>{info.notaObtenida}</td>
                        </tr>
                    ))
                }
               
                
            </tbody>
        </table>
        
              <Modal isOpen={modalFiltro}>
                      <ModalHeader>Estudiantes</ModalHeader>

                      <ModalBody>
                          <Form>                       
                            <FloatingLabel controlId="floatingSelect" label="Estudiante">
                                <select id="rol" name="estudiantes" className="form-control" onChange={handlerOpcion}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     {
                                         datainfoEstudiante.map((item,i)=>(
                                            <option key={"datainfoEstudiante"+i} value={item.nombreCompleto}>{item.nombreCompleto}</option>
                                         ))
                                     }
                                </select> 
                                <br/>
                            </FloatingLabel>

                              
                          </Form>
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>abrirCerrarModalFiltro()}>Aceptar</Button>
                      
                      </ModalFooter>
                </Modal>





        </div>

    )


}