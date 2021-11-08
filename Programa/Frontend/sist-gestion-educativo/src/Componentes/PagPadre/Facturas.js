import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';

import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Facturas() {
    const cookies = new Cookies();
    const baseUrlHijos ="https://localhost:44329/api/Estudiante_Vistas/"+cookies.get("cedula")+"/1";
    const baseUrlFacturas ="https://localhost:44329/api/Factura_Vistas";
    const [modalHijos,setModaHijos] = useState(true);
    const [hijoSeleccionado,setHijoSeleccionado] = useState([]);

    const [dataHijos,setDataHijos]=useState([]);
    const [dataFacturas,setDataFacturas] = useState([]);

    const abrirCerrarModalHijos=()=>{
        setModaHijos(!modalHijos);
        if(modalHijos==true){
            peticionGetFacturas();
        }
    }
    const handlerOpcionHijo=e=>{
        const opcion=e.target.value;
        setHijoSeleccionado(opcion);
        console.log(opcion);

    }
    
    const peticionGetHijos = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrlHijos)
        .then(response=>{
            setDataHijos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    const peticionGetFacturas = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrlFacturas+"/"+hijoSeleccionado)
        .then(response=>{
            setDataFacturas(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    useEffect(() => { //Hace efecto la peticion
        peticionGetHijos();
        

    }, [])
    return (
        <div  className="col-sm-8">
            <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Facturas</h2>
            <table className="table table-hover mt-5 offset-md-3"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Consecutivo</th>
                <th>Matricula</th>
                <th>Estudiante</th>
                <th>Nombre Completo</th>
                <th>Grupo</th>
                <th>Materia</th>
                <th>Período</th>
                <th>Año</th>
                <th>IVA(%)</th>
                <th>Monto sin IVA(₡)</th>
                <th>Total Pagado IVA(₡)</th>
                <th>Fecha de Pago</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    dataFacturas.map(fact=>(
                        <tr key ={fact.consecutivo}>
                        <td>{fact.consecutivo}</td>
                        <td>{fact.idMatricula}</td>
                        <td>{fact.cedulaEstudiante}</td>
                        <td>{fact.nombreCompleto}</td>
                        <td>{fact.codigoGrupo}</td>
                        <td>{fact.nombreMateria}</td>
                        <td>{fact.numPeriodo}</td>
                        <td>{fact.anno}</td>
                        <td>{fact.iva}</td>
                        <td>{fact.totalPago}</td>
                        <td>{fact.totalPagadoIva}</td>
                        <td>{fact.fechaPago}</td>
                        </tr>
                    ))
                }
               
                
            </tbody>
        </table>
  

             <Modal isOpen={modalHijos}>
                      <ModalHeader>Seleccione un hijo</ModalHeader>

                      <ModalBody>
                                             
                      <FloatingLabel controlId="floatingSelect" label="Hijos">
                                <select id="rol" name="hijos" className="form-control" onChange={handlerOpcionHijo}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                     {
                                         dataHijos.map((item,i)=>(
                                            <option key={"hijos"+i} value={item.cedula}>{item.nombreCompleto}</option>
                                         ))
                                     }
                                </select> 
                                <br/>
                        </FloatingLabel>
                              
                         
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>abrirCerrarModalHijos()}>Aceptar</Button>
                      </ModalFooter>
            </Modal>
        </div>
    )
}
