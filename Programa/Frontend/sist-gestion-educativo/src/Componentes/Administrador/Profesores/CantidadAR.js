import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import {Bar} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';


export default function CantidadAR(){
    const baseUrlPeriodos = "https://localhost:44307/api/periodos";
    const baseUrlCantidad = "https://localhost:44307/api/CantidadAR";

    const [dataCantidad, setDataCantidad]= useState([]);
    const [dataPeriodos,setDataPeriodos] = useState([]);

    const [modalFiltro,setModalFiltro] = useState(false);
    const [numSeleccionado, setNumSeleccionado] = useState([]);
    const [annoSeleccionado, setAnnoSeleccionado] = useState([]);
    var grupos = dataCantidad.map(es=> es.codigoNombre);
    var cantidadA = dataCantidad.map(nota=> nota.cantidadAprobados);
    var cantidadR = dataCantidad.map(nota=> nota.cantidadReprobados);

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
    const peticionGetCantidad= async()=>{ //Realiza peticiones Get al backend de las matriculas
        await axios.get(baseUrlCantidad+"/"+ numSeleccionado + "/" + annoSeleccionado )
        .then(response=>{
            setDataCantidad(response.data);
            console.log(dataCantidad);
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

    const filtroGrupos=()=>{
        abrirCerrarModalFiltro();
        peticionGetCantidad();
       // console.log(dataGrupos)
    }
    const abrirCerrarModalFiltro=()=>{
        setModalFiltro(!modalFiltro);

    }



    useEffect(() => { //Hace efecto la peticion
  
        peticionGetPeriodos();
    }, [])

    const data={
        labels: grupos,
        datasets:[{
            label : 'Aprobados',
            backgroundColor: ['#6C63FF', '#5757AF', '#8F8FC3', '#BAB8EF'],
            boderColor: 'black',
            boderWidth: 1,
            hoverBackgroundColor: '#A09BF3',
            hoverBorderColor: '#FFFF',
            data: cantidadA

        },
        {
            label : 'Reprobados',
            backgroundColor: ['#BE65F5', '#A66ECB', '#B091C9', '#5B3D73'],
            boderColor: 'black',
            boderWidth: 1,
            hoverBackgroundColor: '#A09BF3',
            hoverBorderColor: '#FFFF',
            data: cantidadR

        }
                           
        ]
    
    };

    const opciones ={
        maintainAspectRatio: false,
        presponsive: true,
        
    }



        return (
            <div style={{width: '90%', height: '500px'}}>
            <br/>
            <h2 className="offset-md-3 font-weight-bold"> Grupos Reprobados y Aprobados : {numSeleccionado} Semestre, {annoSeleccionado}</h2>
            <Button className="btn btn-primary mt-4 offset-md-3 "size="sm" onClick={()=>abrirCerrarModalFiltro()} >Periodos</Button>
            <Bar  data= {data} options={opciones}/> 

            
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