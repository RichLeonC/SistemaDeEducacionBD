import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

export default function PromedioGrupos() {
    const baseUrlGrupos = "https://localhost:44329/api/Grupos";
    const baseUrlPeriodos = "https://localhost:44329/api/periodos";

    const [dataGrupos,setDataGrupos] = useState([]);
    const [dataHorarios,setDataHorarios] = useState([]);

    const [modalFiltro,setModalFiltro] = useState(false);

    const peticionGetPeriodos = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlPeriodos)
        .then(response=>{
            setDataPeriodos(response.data);
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

    useEffect(() => { //Hace efecto la peticion

        peticionGetPeriodos();

        
    }, [])

    return (
        <div>
                <Modal isOpen={modalFiltro}>
                      <ModalHeader>Filtrar Grupos</ModalHeader>

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
                              
                          </Form>
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>gruposFiltrados()}>Aceptar</Button>
                        <Button className="btn btn-danger" size="sm" onClick={()=>abrirCerrarModalFiltro()}
                        >Cancelar</Button>
                      </ModalFooter>
                </Modal>
        </div>
    )
}
