import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';

export default function PorcentajeReprobados() {

    const baseUrlReprobados = "https://localhost:44329/api/Estudiante_Vistas";
    const baseUrlPeriodos = "https://localhost:44329/api/periodos";

    const [dataPeriodos,setDataPeriodos] = useState([]);
    const [dataReprobados,setDataReprobados] = useState([]);
    const [inicioSeleccionado, setInicioSeleccionado] = useState([]);
    const [finSeleccionado, setFinSeleccionado] = useState([]);
    const [modalFiltro,setModalFiltro] = useState(true);

    const abrirCerrarModalFiltro=()=>{
        setModalFiltro(!modalFiltro);
    }

    const handlerOpcionInicio=e=>{  
        const opcion = e.target.value;
        setInicioSeleccionado(opcion);
        console.log(opcion);
    }
    const handlerOpcionFin=e=>{  
        const opcion = e.target.value;
        setFinSeleccionado(opcion);
        console.log(opcion);
    }
    const handlerOpcionNum=e=>{  
        const opcion = e.target.value;
        peticionGetReprobados(opcion)
        console.log(opcion);
    }

    const peticionGetPeriodos = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlPeriodos)
        .then(response=>{
            setDataPeriodos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetReprobados = async(num)=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlReprobados+"/"+inicioSeleccionado+"/"+finSeleccionado+"/"+num)
        .then(response=>{
            setDataReprobados(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    const filtroReprobados =()=>{
        abrirCerrarModalFiltro();
        peticionGetReprobados(2);
    }

    useEffect(() => { //Hace efecto la peticion

        peticionGetPeriodos();

        
    }, [])
    return (
        <div className="col-sm-8">
            <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Porcentaje de reprobación por grupo</h2>
            <br/>
            <h3 className="text-center offset-md-5 font-weight-bold">Rango: {inicioSeleccionado} - {finSeleccionado}</h3>
            <Button className="btn btn-primary mt-4 offset-md-3 " onClick={()=>filtroReprobados()}>Filtrar</Button>
            <select id="rol" name="inicio" className=" offset-md-6 col-sm-5 " onChange={handlerOpcionNum}>
                <option value ={-1} selected disabled>Opciones</option>
                 <option key={2} value={2}>Descendente</option>
                 <option key={3} value={3}>Ascendente</option>
                                      
                                     
            </select> 
            <table className="table table-hover mt-5 offset-md-3"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Código Grupo</th>
                <th>Período</th>
                <th>Año</th>
                <th>(%) Reprobados</th>
                <th>Profesor</th>
                <th>Grado</th>

                </tr>
            </thead>
            <tbody>
                {
                    dataReprobados.map(repro=>(
                        <tr>
                        <td>{repro.codigoGrupo}</td>
                        <td>{repro.numPeriodo}</td>
                        <td>{repro.anno}</td>
                        <td>{repro.porcentajeReprobado}</td>
                        <td>{repro.ProfesorImparte}</td>
                        <td>{repro.grado}</td>
                        </tr>
                    ))
                }
               
                
            </tbody>
        </table>
            <Modal isOpen={modalFiltro}>
                      <ModalHeader>Filtrar Períodos</ModalHeader>

                      <ModalBody>
                          <Form>                       
                            <FloatingLabel controlId="floatingSelect" label="Desde">
                                <select id="rol" name="inicio" className="form-control" onChange={handlerOpcionInicio}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     {
                                         dataPeriodos.map((item,i)=>(
                                            <option key={"inicio"+i} value={item.inicio}>{item.fechaInicio}</option>
                                         ))
                                     }
                                </select> 
                                <br/>
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingSelect" label="Hasta">
                                <select id="role" name="fin" className="form-control" onChange={handlerOpcionFin}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     {
                                         dataPeriodos.map((item,i)=>(
                                             <option key={"fin"+i} value={item.fin}>{item.fechaFinal}</option>
                                         ))
                                     }
                                </select> 
                                   
                            </FloatingLabel>
                              
                          </Form>
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>filtroReprobados()}>Aceptar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalFiltro()}
                        >Cancelar</Button>
                      </ModalFooter>
                </Modal>
        </div>
    )
}
