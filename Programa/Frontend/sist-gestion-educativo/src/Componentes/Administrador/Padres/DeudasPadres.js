import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'

export default function DeudasPadres() {

    const baseUrl = "https://localhost:44329/api/Padres_DeudasVistas";
    const baseUrlCobros = "https://localhost:44329/api/Cobros"

    const [dataPadres,setDataPadres] = useState([]);
    const [dataCobros,setDataCobros] = useState([]);

    const [modalCobros,setModaCobros] = useState(false);
    const [modalCarga,setModaCarga] = useState(false);
    const [padreSeleccionado,setPadreSeleccionado] = useState([]);

    const abrirCerrarModalCobros=()=>{
        setModaCobros(!modalCobros);
        if(modalCobros==false){
            abrirCerrarModalCarga();
        }
  
    }

    const abrirCerrarModalCarga=()=>{
        peticionGetCobros();
        setModaCarga(!modalCarga);
        
        
        
    }

    const peticionGetDeudas = async()=>{ //Realiza peticiones Get al backend 
        await axios.get(baseUrl)
        .then(response=>{
            setDataPadres(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetCobros = async()=>{ //Realiza peticiones Get al backend 
        await axios.get(baseUrlCobros+"/"+padreSeleccionado+"/1")
        .then(response=>{
            setDataCobros(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarPadre=(padre)=>{
        setPadreSeleccionado(padre);
       
        abrirCerrarModalCarga();
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGetDeudas();
        
        
    }, [])
    return (
        <div className="col-sm-8">
             <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Top 10 padres más endeudados</h2>
        <table className="table table-hover mt-5 offset-md-3"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Nombre Completo</th>
                <th>Cantidad de cobros</th>
                <th>Acciones</th>

                </tr>
            </thead>
            <tbody>
                {
                    dataPadres.map(padre=>(
                        <tr>
                        <td>{padre.nombrePadre}</td>
                        <td>{padre.cantidad}</td>
                        <td>
                            <button className="btn btn-warning" onClick={()=>seleccionarPadre(padre.cedulaPadre)}
                            >Ver Cobros</button>{" "}</td>
                        </tr>
                    ))
                }
               
                
            </tbody>
        </table>

        <Modal isOpen={modalCobros} className="modal-dialog modal-lg">
                      <ModalHeader>Lista de cobros pendientes</ModalHeader>

                      <ModalBody>
                                             
                      
                               <table className="table table-hover"striped bordered hover variant="light">
                                    <thead>
                                        <tr>
                                        <th>Consecutivo</th>
                                        <th>Matricula</th>
                                        <th>Estudiante</th>
                                        <th>Grupo</th>
                                        <th>Materia</th>
                                        <th>Período</th>
                                        <th>Año</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {
                                            dataCobros.map(cobro=>(
                                                <tr>
                                                <td>{cobro.consecutivo}</td>
                                                <td>{cobro.idMatricula}</td> 
                                                <td>{cobro.cedulaEstudiante}</td> 
                                                <td>{cobro.codigoGrupo}</td> 
                                                <td>{cobro.nombreMateria}</td> 
                                                <td>{cobro.numPeriodo}</td> 
                                                <td>{cobro.anno}</td> 
                                                </tr>
                                            ))
                                        }
               
                
                                        </tbody>
                               </table>
                                <br/>
                              
                         
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>abrirCerrarModalCobros()}>Aceptar</Button>
                      </ModalFooter>
            </Modal>

            <Modal isOpen={modalCarga}>
                <ModalBody>
                    Cargando información, presione aceptar
                </ModalBody>
                <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>abrirCerrarModalCobros()}>Aceptar</Button>
                      </ModalFooter>
            </Modal>
        </div>
    )
}
