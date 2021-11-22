import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';
export default function VentasPeriodo() {
    
    const baseUrlVentas = "https://localhost:44329/api/Cobros";
    const baseUrlPeriodos = "https://localhost:44329/api/periodos";

    const [dataPeriodos,setDataPeriodos] = useState([]);
    const [dataVentas,setDataVentas] = useState([]);
    const [inicioSeleccionado, setInicioSeleccionado] = useState([]);
    const [finSeleccionado, setFinSeleccionado] = useState([]);
    const [modalFiltro,setModalFiltro] = useState(true);

    const data={
        labels: ['(%) Rango actual','(%) Otros períodos'],
        datasets:[{
            backgroundColor: ['#6C63FF', '#5757AF', '#8F8FC3', '#BAB8EF'],
            data: [dataVentas.map(venta=>venta.ventas),dataVentas.map(venta=>venta.otrosPeriodos)]

        }]

        
    
    };

    const opciones ={
        presponsive: true,
        maintainAspectRatio: false
        
    }
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

    const peticionGetVentas = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlVentas+"/"+inicioSeleccionado+"/"+finSeleccionado+"/2")
        .then(response=>{
            setDataVentas(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetPeriodos = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlPeriodos)
        .then(response=>{
            setDataPeriodos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    const filtroIngresos =()=>{
        abrirCerrarModalFiltro();
        peticionGetVentas();
    }

    useEffect(() => { //Hace efecto la peticion

        peticionGetPeriodos();

        
    }, [])
    return (
        <div>
            <div style={{width: '90%', height: '500px'}}>
            <br/>
            <h3 className="offset-md-3 font-weight-bold">(%) Ventas por periodo - Rango: {inicioSeleccionado} - {finSeleccionado}</h3>
            <Button className="btn btn-primary mt-4 offset-md-3 " onClick={()=>abrirCerrarModalFiltro()}>Filtrar</Button>
            <Pie  data={data} options={opciones}/>
            </div>
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
                        <Button className="btn btn-primary"size="sm" onClick={()=>filtroIngresos()}>Aceptar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalFiltro()}
                        >Cancelar</Button>
                      </ModalFooter>
                </Modal>
        </div>
    )
}
