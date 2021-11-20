import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,ModalFooter} from 'reactstrap'
import {Pie} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

export default function Ingresos() {

    const baseUrlIngresos = "https://localhost:44329/api/Facturas";
    const baseUrlPeriodos = "https://localhost:44329/api/periodos";

    const [dataIngresos,setDataIngresos] = useState([]);
    const [dataPeriodos,setDataPeriodos] = useState([]);
    const [numSeleccionado, setNumSeleccionado] = useState([]);
    const [annoSeleccionado, setAnnoSeleccionado] = useState([]);
    const [modalFiltro,setModalFiltro] = useState(true);

    const grados = dataIngresos.map(ingreso=>ingreso.grado);
    const cantidad = dataIngresos.map(ingreso=>ingreso.ingreso)
    const data={
        labels: Grados(),
        datasets:[{
            backgroundColor: ['#6C63FF', '#5757AF', '#8F8FC3', '#BAB8EF'],
            data: cantidad

        }]
    
    };
    const opciones ={
        presponsive: true,
        maintainAspectRatio: false
        
    }

    const abrirCerrarModalFiltro=()=>{
        setModalFiltro(!modalFiltro);
    }

    const handlerOpcionNum=e=>{  //Handler para guardar en el estado el numero de periodo escogido
        const opcion = e.target.value;
        setNumSeleccionado(opcion);
        console.log(opcion);
    }
    const handlerOpcionAnno=e=>{  //Handler para guardar en el estado el numero de periodo escogidp
        const opcion = e.target.value;
        setAnnoSeleccionado(opcion);
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
    const peticionGetIngresos = async()=>{ 
        await axios.get(baseUrlIngresos+"/"+numSeleccionado+"/"+annoSeleccionado)
        .then(response=>{
            setDataIngresos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => { //Hace efecto la peticion

        peticionGetPeriodos();

        
    }, [])

    function filtroAnnosPeriodo(){ //Omite los numeros de año duplicados
        let filtradosA = [];

        for(let periodo of dataPeriodos){
            if(!filtradosA.includes(periodo.anno)){
                filtradosA.push(periodo.anno);
            }
            
        }
        return filtradosA;
    }

    function filtroNumerosPeriodo(){ //Omite los numeros de periodo duplicados
        let filtradosP = [];
        
        for(let periodo of dataPeriodos){
            if(!filtradosP.includes(periodo.numero)){
                filtradosP.push(periodo.numero);
            }
            
        }
        return filtradosP;

    }

    function Grados(){
        let grados =[];

        for(let grado of dataIngresos){
            grados.push("Grado "+grado.grado);
        }
        return grados;
    }

    const filtroIngresos =()=>{
        abrirCerrarModalFiltro();
        peticionGetIngresos();
    }
    return (
        <div>
            <div style={{width: '90%', height: '500px'}}>
            <h2 className="offset-md-4 font-weight-bold">(%) Ingresos por grado por período: {numSeleccionado} Semestre, {annoSeleccionado}</h2>
            <Button className="btn btn-primary mt-4 offset-md-3 " onClick={()=>abrirCerrarModalFiltro()}>Filtrar</Button>
            <Pie  data={data} options={opciones}/>
            </div>
             <Modal isOpen={modalFiltro}>
                      <ModalHeader>Filtrar Período</ModalHeader>

                      <ModalBody>
                          <Form>                       
                            <FloatingLabel controlId="floatingSelect" label="Período">
                                <select id="rol" name="periodos" className="form-control" onChange={handlerOpcionNum}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     {
                                         filtroNumerosPeriodo().map((item,i)=>(
                                            <option key={"periodo"+i} value={item}>{item}</option>
                                         ))
                                     }
                                </select> 
                                <br/>
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingSelect" label="Año">
                                <select id="role" name="annos" className="form-control" onChange={handlerOpcionAnno}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     {
                                         filtroAnnosPeriodo().map((item,i)=>(
                                             <option key={"anno"+i} value={item}>{item}</option>
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
