
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import { ModalHeader,Modal,ModalBody,Button,Form,ModalFooter} from 'reactstrap'

export default function Generos() {
    const baseUrlGeneros = "https://localhost:44329/api/periodos";

    const [dataGeneros,setDataGeneros] = useState([]);
    const [numSeleccionado, setNumSeleccionado] = useState([])
    const [dataPeriodos,setDataPeriodos] = useState([]);;
    const [annoSeleccionado, setAnnoSeleccionado] = useState([]);
    const [modalFiltro,setModalFiltro] = useState(true);

    
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
    console.log(dataGeneros)
    const data={
        labels: ['Femenino','Masculino'],
      
        datasets:[{
            backgroundColor: ['#6C63FF', '#5757AF', '#8F8FC3', '#BAB8EF'],
            data: [dataGeneros.map(genero=>genero.femenino),dataGeneros.map(genero=>genero.masculino)]

        }]
       
    };

    const opciones ={
        presponsive: true,
        maintainAspectRatio: false
        
    }
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
    const filtroGeneros =()=>{
        abrirCerrarModalFiltro();
        peticionGetGeneros();
    }

    const peticionGetPeriodos = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlGeneros)
        .then(response=>{
            setDataPeriodos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetGeneros = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlGeneros+"/"+numSeleccionado+"/"+annoSeleccionado)
        .then(response=>{
            setDataGeneros(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    useEffect(() => { //Hace efecto la peticion
        
        peticionGetPeriodos();

    }, [])
    return (
        <div>
            <div  style={{width: '90%', height: '500px'}}>
                <br/>
            <h2 className="offset-md-3 font-weight-bold">(%) Porcentaje de estudiantes por género por período : {numSeleccionado} Semestre, {annoSeleccionado}</h2>
            <Button className="btn btn-primary mt-4 offset-md-3 " onClick={()=>abrirCerrarModalFiltro()}>Filtrar</Button>
            <Doughnut  data={data} options={opciones}/>
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
                        <Button className="btn btn-primary"size="sm" onClick={()=>filtroGeneros()}>Aceptar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalFiltro()}
                        >Cancelar</Button>
                      </ModalFooter>
                </Modal>
        </div>
    )
}
