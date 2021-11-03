import React,{Component,useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { Card,ListGroup,Table} from 'react-bootstrap';

export default function PagAsistencia(props) {
    const cookies = new Cookies();
    const baseUrlMatriculas = "https://localhost:44307/api/matriculas";
    const baseUrlUsuarios =  "https://localhost:44329/api/estudiantes";
    const baseUrlGrupos = "https://localhost:44307/api/Grupos";
    const [matriculas,setData] = useState([]); //Estado para las matriculas
    const [dataE,setDataE] = useState([]); //Estado para los estudiantes
    const [grupodisponibles, setGrupo]= useState([]);
    const [grupoSeleccionado,setGrupoSeleccionado] = useState([]);
    const [estudiantesMatriculados,setDataEstudiante] = useState([]);
    var cedula = cookies.get("cedula");// toma la cedula del profesor que haya iniciado sesión. 
    
  
        

    const peticionGetG = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrlGrupos+`/${cedula}`)
        .then(response=>{
            setGrupo(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

   

    

    
    const peticionGetM = async()=>{ //Realiza peticiones Get al backend materia
        await axios.get(baseUrlMatriculas+`/${grupoSeleccionado}`)    
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const estudiantesM = ()=>{
       var iterator = dataE.values();
        for (let matriculas of iterator ){

            setDataEstudiante(dataE.filter(estudiante => estudiante.cedula == matriculas.cedulaEstudiante));

        }



    }






    const peticionGetE = async()=>{ //Realiza peticiones Get al backend estudiantes
        await axios.get(baseUrlUsuarios)    
        .then(response=>{
            setDataE(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }




    useEffect(() => { //Hace efecto la peticion
       
        peticionGetE();
        peticionGetM();
        peticionGetG();
        
    }, [])

    const Checkbox = props => (
        <input type="checkbox" {...props} />)
      
    const state = { checked: false }
    const handleCheckboxChange = event => this.setState({ checked: event.target.checked })
 
    const handlerOpcion = e=>{ //Guarda el grupo selecionado en el estado
        const opcion = e.target.value;
        setGrupoSeleccionado(opcion);
        console.log(opcion);
     
        
    }
     
    
    
     


    return (// metodo que despliega la tabla que muestra los datos del profesor 
        <div>
        <Form>                       
        <FloatingLabel controlId="floatingSelect" label="Código de grupo">
            <select id="rol" name="grupos" className="form-control" onChange={handlerOpcion}>
                <option value ={-1} selected disabled>Opciones</option>
                 
            {
              grupodisponibles.map((item,i)=>(
                
                <option key={"grupo"+i} value={item.codigoNombre}>{item.codigoNombre}</option>
                
              ))
            }
            </select> 
               
        </FloatingLabel>
          
      </Form>






        <Table className="mt-5 offset-md-0 table table-hover"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellido1</th>
                <th>Apellido2</th>
                <th>Asistencia</th>
             
                </tr>
            </thead>
            <tbody>
           {estudiantesMatriculados.map(estudiante =>(
               <tr key ={estudiante.cedula}>
                <td>{estudiante.cedula}</td>
                <td></td>
                <td></td>
                <td></td>
                <td> <Checkbox/></td>
               
                </tr>
           ))}
            </tbody>
        </Table>
    )
    </div>
    )}