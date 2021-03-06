import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';

import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Cobros() {
    const cookies = new Cookies();
    const baseUrlEstudiantes = "https://localhost:44329/api/Estudiante_Vistas/"+cookies.get("cedula")+"/1";
    const baseUrlMatriculas = "https://localhost:44329/api/matriculas";
    const baseUrlCobros = "https://localhost:44329/api/cobros";
    const baseUrlFacturas = "https://localhost:44329/api/facturas"

    const [modalHijos,setModaHijos] = useState(true);
    const [hijoSeleccionado,setHijoSeleccionado] = useState([]);

    const [dataHijos,setDataHijos]=useState([]);
    const [dataMatriculas,setDataMatriculas]=useState([]);
    const [dataCobros,setDataCobros]=useState([]);
    const [dataCobrosFiltrados,setDataCobrosFiltrados] = useState([]);
    const[modalFiltroCobros,setModalFiltroCobros] = useState(false);
    const[estadoEscogido,setEstadoEscogido] = useState([]);
    const [cobroSeleccionado,setCobroSeleccionado] = useState([]);
    const [modalPago,setModalPago] = useState(false);

    const [factura,setFactura] = useState({
        consecutivo: '',
        totalPago:'',
        iva:13,
        fechaPago:"2021-10-28T00:00:00"
    })


    const abrirCerrarModalHijos=()=>{
        setModaHijos(!modalHijos);
        if(modalHijos==true){
            setDataCobrosFiltrados( dataCobros.filter(cobro=>matriculasFiltradas.find(matricula=>matricula.idMatricula==cobro.idMatricula)));
        }
    }

    const abrirCerrarModalFiltroCobros=()=>{
        setModalFiltroCobros(!modalFiltroCobros);
        
    }

    const abrirCerrarModalPago=()=>{
        setModalPago(!modalPago);
    }

    const handlerOpcionHijo=e=>{
        const opcion=e.target.value;
        setHijoSeleccionado(opcion);
        console.log(opcion);

    }

    const handlerOpcionEstado=e=>{
        const opcion = e.target.value;
        setEstadoEscogido(opcion);
    }

  

    const peticionGetEstudiantes = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrlEstudiantes)
        .then(response=>{
            setDataHijos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetMatriculas = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrlMatriculas)
        .then(response=>{
            setDataMatriculas(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetCobros = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrlCobros)
        .then(response=>{
            setDataCobros(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionPutCobros = async()=>{
        cobroSeleccionado.estado="Pagado";
        await axios.put(baseUrlCobros+"/"+cobroSeleccionado.consecutivo,cobroSeleccionado)
        .then(response=>{
            var respuesta = response.data;
            var dataAuxiliar = dataCobros;
            dataAuxiliar.map(cobro=>{
                if(cobro.consecutivo == cobroSeleccionado.consecutivo){
                    cobro.estado="Pagado";
                }
            });
            abrirCerrarModalPago();
        }).catch(error=>{
            console.log("No se pudo cambiar el estado");
        })
    }

    const peticionPostFactura=async()=>{
        console.log("CSelec: "+cobroSeleccionado.idMatricula);
        const matricula =  matriculasFiltradas.find(m=>m.idMatricula == cobroSeleccionado.idMatricula);
        
        factura.consecutivo = cobroSeleccionado.consecutivo;
        factura.totalPago = matricula.costeMatricula;
        console.log(factura);

        await axios.post(baseUrlFacturas,factura)
        
    }


    


    const filtrar=()=>{
        setDataCobrosFiltrados(dataCobros.filter(cobro=>matriculasFiltradas.find(matricula=>matricula.idMatricula==cobro.idMatricula &&
            cobro.estado==estadoEscogido)));
        abrirCerrarModalFiltroCobros();
    }
    const matriculasFiltradas = dataMatriculas.filter(matricula=>matricula.cedulaEstudiante==hijoSeleccionado);//Matriculas que pertenecen al hijo

    const seleccionarCobro=(cobro)=>{
       
            setCobroSeleccionado(cobro);
            //realizarPago();
            abrirCerrarModalPago();
        
    }
     const realizarPago=()=>{
         peticionPostFactura();
         peticionPutCobros();
        
     }

    useEffect(() => { //Hace efecto la peticion
        peticionGetEstudiantes();
        peticionGetMatriculas();
        peticionGetCobros();
    }, [])

    return (
        <div className="col-sm-8">
            <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Cobros</h2>
            <button onClick={()=>abrirCerrarModalFiltroCobros()} className=" offset-md-3 btn btn-success">Filtrar Cobros</button>
            <table className="table table-hover mt-5 offset-md-3"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Consecutivo</th>
                <th>Matricula</th>
                <th>Estado</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataCobrosFiltrados.map(cobro=>(
                        <tr key ={cobro.consecutivo}>
                        <td>{cobro.consecutivo}</td>
                        <td>{cobro.idMatricula}</td>
                        <td>{cobro.estado}</td>
                        <td>
                            <button className="btn btn-success" onClick={()=>seleccionarCobro(cobro)}
                            >Pagar</button>{" "}
                        </td>
                       
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

            <Modal isOpen={modalFiltroCobros}>
                      <ModalHeader>Ver cobros</ModalHeader>

                      <ModalBody>
                                             
                      <FloatingLabel controlId="floatingSelect" label="Estado">
                                <select id="rol" name="estado" className="form-control" onChange={handlerOpcionEstado}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                    <option value="Pagado">Pagados</option>
                                    <option value="Pendiente">Pendientes</option>
                                </select> 
                                <br/>
                        </FloatingLabel>
                              
                         
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>filtrar()}>Aceptar</Button>
                        <Button className="btn btn-danger"size="sm" onClick={()=>abrirCerrarModalFiltroCobros()}>Cancelar</Button>
                      </ModalFooter>
            </Modal>

            <Modal isOpen={modalPago}>

                      <ModalBody>
                 
                          <label>Cobro pagado exitosamente</label>  
                         
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>realizarPago()}>Aceptar</Button>

                      </ModalFooter>
            </Modal>
        </div>
    )
}
