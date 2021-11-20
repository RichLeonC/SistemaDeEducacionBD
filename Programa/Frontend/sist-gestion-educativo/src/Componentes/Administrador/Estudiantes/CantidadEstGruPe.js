import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import {Pie} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

export default function CantidadEstGruPe() {

    const baseUrlMatriculas = "https://localhost:44307/api/matriculas";
    const baseUrlPeriodos = "https://localhost:44307/api/periodos";
    const [dataMatricula, setDataMatricula]= useState([]);
    const [dataPeriodos,setDataPeriodos] = useState([]);
    var grupos = dataMatricula.map(es=> es.codigoGrupo);
    var cantidad= dataMatricula.map(cantidad=> cantidad.cantidadEstudiantes);
    const [modalFiltro,setModalFiltro] = useState(false);
    const [numSeleccionado, setNumSeleccionado] = useState([]);
    const [annoSeleccionado, setAnnoSeleccionado] = useState([]);
    


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


    const data={
        labels: grupos,
        datasets:[{
            backgroundColor: ['#6C63FF', '#5757AF', '#8F8FC3', '#BAB8EF'],
            data: cantidad

        }]
    
    };


    const peticionGetMatricula= async()=>{ //Realiza peticiones Get al backend de las matriculas
        await axios.get(baseUrlMatriculas+"/"+ numSeleccionado + "/" + annoSeleccionado + "/4")
        .then(response=>{
            setDataMatricula(response.data);
            console.log(dataMatricula);
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



    const opciones ={
        presponsive: true,
        maintainAspectRatio: false
        
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

    const filtroGrupos=()=>{
        abrirCerrarModalFiltro();
        peticionGetMatricula();
       // console.log(dataGrupos)
    }
    const abrirCerrarModalFiltro=()=>{
        setModalFiltro(!modalFiltro);

    }



    return (
        <div style={{width: '90%', height: '500px'}}>
        <Button className="btn btn-primary mt-4 offset-md-3 "size="sm" onClick={()=>abrirCerrarModalFiltro()} >Periodos</Button>
        <Pie  data={data} options={opciones}/>
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