import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import {Pie , Doughnut} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

export default function TopAusencias(){

    const baseUrlTopAusencias = "https://localhost:44307/api/TopAusenciaVista";
    const baseUrlPeriodos = "https://localhost:44307/api/periodos";
    const[dataTop, setDataTop]=useState([]);
    const [dataPeriodos,setDataPeriodos] = useState([]);
    const [modalFiltro,setModalFiltro] = useState(false);
    const [numSeleccionado, setNumSeleccionado] = useState([]);
    const [annoSeleccionado, setAnnoSeleccionado] = useState([]);
    


    const peticionGetAusencias = async()=>{ //Realiza peticiones Get al backend ausencias sin filtro
        await axios.get(baseUrlTopAusencias)
        .then(response=>{
            setDataTop(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetAusenciasFiltro = async()=>{ //Realiza peticiones Get al backend ausencias con filtro
        await axios.get(baseUrlTopAusencias+"/"+ numSeleccionado + "/" + annoSeleccionado)
        .then(response=>{
            setDataTop(response.data);
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



    useEffect(() => { //Hace efecto la peticion
 
        peticionGetAusencias();
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


    const filtroGrupos=()=>{
        abrirCerrarModalFiltro();
        peticionGetAusenciasFiltro();
       // console.log(dataGrupos)
    }
    const abrirCerrarModalFiltro=()=>{
        setModalFiltro(!modalFiltro);

    }



    return (
        <div className="col-sm-8"> 
        <Button className="btn btn-primary mt-4 offset-md-2 "size="sm" onClick={()=>abrirCerrarModalFiltro()} >Periodos</Button>
        <table className="table table-hover mt-4 offset-md-3"striped bordered hover variant="light">
        <thead>
            <tr>
            <th>Nombre Completo</th>
            <th>Cantidad de ausencias</th>
            </tr>
        </thead>
        <tbody>
            {
                dataTop.map(est=>(
                    <tr>
                    <td>{est.nombreCompleto}</td>
                    <td>{est.cantidadAusencias}</td>
                    </tr>
                ))
            }
  
        </tbody>
        </table>

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