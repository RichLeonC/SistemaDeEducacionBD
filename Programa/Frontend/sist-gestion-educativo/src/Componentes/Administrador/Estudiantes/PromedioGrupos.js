import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import {Bar} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

export default function PromedioGrupos() {
    const baseUrlGrupos = "https://localhost:44329/api/Grupos";
    const baseUrlPeriodos = "https://localhost:44329/api/periodos";

    const [dataGrupos,setDataGrupos] = useState([]);
    const [dataPeriodos,setDataPeriodos] = useState([]);
    const [numSeleccionado, setNumSeleccionado] = useState([]);
    const [annoSeleccionado, setAnnoSeleccionado] = useState([]);
    const [modalFiltro,setModalFiltro] = useState(true);

    const grupos = dataGrupos.map(grupo=>grupo.codigoGrupo);
    const promedio = dataGrupos.map(grupo=>grupo.promedio);
    const data={
        labels: grupos,
        datasets:[{
            label : '(%) Promedio de Aprobados',
            backgroundColor: '#61608E',
            boderColor: 'black',
            boderWidth: 1,
            hoverBackgroundColor: '#A09BF3',
            hoverBorderColor: '#FFFF',
            data: promedio

        }]
    
    };

    const opciones ={
        maintainAspectRatio: false,
        presponsive: true,
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

    function filtroAnnosPeriodo(){ //Omite los numeros de año duplicados
        let filtradosA = [];

        for(let periodo of dataPeriodos){
            if(!filtradosA.includes(periodo.anno)){
                filtradosA.push(periodo.anno);
            }
            
        }
        return filtradosA;
    }

    const peticionGetPeriodos = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlPeriodos)
        .then(response=>{
            setDataPeriodos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetGrupos = async()=>{ 
        await axios.get(baseUrlGrupos+"/"+numSeleccionado+"/"+annoSeleccionado+"/1")
        .then(response=>{
           
            setDataGrupos(response.data);
        }).catch(error=>{
            console.log(error);
        })
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


    const filtroGrupos=()=>{
        abrirCerrarModalFiltro();
        peticionGetGrupos();
       // console.log(dataGrupos)
    }



    useEffect(() => { //Hace efecto la peticion

        peticionGetPeriodos();

        
    }, [])

    return (
        <div>
            <br/>
            <div style={{width: '90%', height: '500px'}}>
            <h2 className="offset-md-4 font-weight-bold">(%) Promedio de aprobación por grupo: {numSeleccionado} Semestre, {annoSeleccionado}</h2>
            <Button className="btn btn-primary mt-4 offset-md-3 " onClick={()=>abrirCerrarModalFiltro()}>Filtrar</Button>
            <Bar className="offset-md-2 mt-5" data= {data} options={opciones}/>
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
                        <Button className="btn btn-primary"size="sm" onClick={()=>filtroGrupos()}>Aceptar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalFiltro()}
                        >Cancelar</Button>
                      </ModalFooter>
                </Modal>
        </div>
    )
}
