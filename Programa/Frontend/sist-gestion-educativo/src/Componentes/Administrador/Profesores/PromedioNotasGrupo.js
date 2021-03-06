import React,{useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap';
import { FloatingLabel, Row } from 'react-bootstrap';

export default function PromedioNotasGrupos() {
    const baseUrlEvaluciones = "https://localhost:44329/api/Evaluacion_Grupo_Estudiante";
    const baseUrlProfesores= "https://localhost:44329/api/Profesor_Vistas";
    const [notasPromedio, setNotasPromedio] = useState([]);
    const [dataProfesor,setDataProfesor] = useState([]);
    const [modalProrfesores, setModalProfesores] = useState(false);
    
    var grupos = notasPromedio.map(es=> es.codigoGrupo);
    var promedio = notasPromedio.map(nota=> nota.promedioNota);
  

    const data={
        labels: grupos,
        datasets:[{
            label : 'Promedio Notas',
            backgroundColor: ['#6C63FF', '#5757AF', '#8F8FC3', '#BAB8EF'],
            boderColor: 'black',
            boderWidth: 1,
            hoverBackgroundColor: '#A09BF3',
            hoverBorderColor: '#FFFF',
            data: promedio

        }
                           
        ]
    
    };

    const opciones ={
        maintainAspectRatio: false,
        presponsive: true,
        
    }

    const intermedio = nombre =>{

        const infoP = dataProfesor.find(profe => profe.nombreCompleto == nombre);
        console.log(infoP);
     
        peticionGetNotasEstudiante(infoP.cedula);

    }


    const handlerOpcion = e =>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        intermedio (opcion);
        console.log(opcion);
   
    }

    const cerrarAbrirModalProfesores = ()=> {
      
        setModalProfesores(!modalProrfesores);

        
    }

    

    const peticionGetVistaProfesores = async()=>{ //Realiza peticiones Get al backend 
        await axios.get(baseUrlProfesores)
        .then(response=>{
            setDataProfesor(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }



    const peticionGetNotasEstudiante = async(cedulaProfe)=>{ //Realiza peticiones Get al backend 
        await axios.get(baseUrlEvaluciones+"/"+cedulaProfe+"/2")
        .then(response=>{
            setNotasPromedio(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }


    useEffect(() => { //Hace efecto la peticion
        
        peticionGetVistaProfesores();
        
    }, [])




    return (
        <div  className="col-sm-8">

        
        <div style={{width: '90%', height: '500px'}}>
            <br/>
            <h2 className="offset-md-6 font-weight-bold"> Promedio de notas por profesor por grupo</h2>
            <Button className="btn btn-primary mt-4 offset-md-3 " onClick={()=>cerrarAbrirModalProfesores()} >Profesores</Button>
            <Bar className="offset-md-4 mt-5" data= {data} options={opciones}/>
        </div>
            <Modal isOpen={modalProrfesores}>
                      <ModalHeader>Profesores</ModalHeader>

                      <ModalBody>
                      <Form>    
                            <FloatingLabel controlId="floatingSelect" label="Profesores">
                                <select id="rol" name="profesores" className="form-control" onChange={handlerOpcion}>
                                    <option value ={-1} selected disabled>Opciones</option>
                                       
                                  {
                                    dataProfesor.map((item,i)=>(
                                      
                                      <option key={"dataProfesor"+i} value={item.nombreCompleto}>{item.nombreCompleto}</option>
                                      
                                    ))
                                  }
                                </select> 
                                     
                              </FloatingLabel>
                              </Form>    
                      </ModalBody>

                      <ModalFooter>
                        <Button className="btn btn-primary"size="sm" onClick={()=>cerrarAbrirModalProfesores()}>Aceptar</Button>
                      </ModalFooter>
            </Modal>

        </div>
    )
}
