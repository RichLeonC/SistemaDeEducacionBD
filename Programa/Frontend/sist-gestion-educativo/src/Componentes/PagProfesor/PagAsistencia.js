import React,{Component,useState,useEffect} from 'react';
import axios from 'axios';
import { ModalHeader,Modal,ModalBody,Button,Form,Select} from 'reactstrap'
import { FloatingLabel } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { Card,ListGroup,Table} from 'react-bootstrap';

export default function PagAsistencia(props) {
    const cookies = new Cookies();
    const baseUrl = "https://localhost:44307/api/matriculas";
    const baseUrlUsuarios =  "https://localhost:44307/api/Estudiante";
    const [data,setData] = useState([]); //Estado para las matriculas
    const [dataE,setDataE] = useState([]); //Estado para los estudiantes
    const [grupo, setGrupo]= useState([]);

   const  useCodigoGrupo = (props) =>{
        setGrupo(this.props.datos)};
        
    
    
   

    const [dataA, setAsistencia]= useState({
        cedula: '',
        nombres: '',
        apellido1:'',
        apellido2:'',
        asistencia:''

    });


    
    

    const peticionGet = async()=>{ //Realiza peticiones Get al backend Matriculas
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })

    }



    const peticionGetE = async()=>{ //Realiza peticiones Get al backend Matriculas
        await axios.get(baseUrlUsuarios)    
        .then(response=>{
            setData(response.dataE);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGet();
        peticionGetE();
        
    }, [])

    const Checkbox = props => (
        <input type="checkbox" {...props} />)
      
    const state = { checked: false }
    const handleCheckboxChange = event => this.setState({ checked: event.target.checked })
 



    return (// metodo que despliega la tabla que muestra los datos del profesor 
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
           
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td> <Checkbox/></td>
               
                </tr>
            
            </tbody>
        </Table>
    )}