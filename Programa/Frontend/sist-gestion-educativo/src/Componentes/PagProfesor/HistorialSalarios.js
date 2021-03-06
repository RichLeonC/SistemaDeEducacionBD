import { colors } from '@material-ui/core'
import React,{Component,useState,useEffect} from 'react';
import { Card,ListGroup,Table} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import axios from 'axios';

//Componente que lista el historial de salarios del profesor
export default function HistorialSalarios() {
    const cookies = new Cookies();
    var cedula = cookies.get("cedula");// toma la cedula del profesor que haya iniciado sesión. 
    const baseUrlHistorialSalario = "https://localhost:44329/api/Profesor_HistorialSalarios";
    const [historial, setHistorial] = useState([]);
    
    const peticionGetHistorial= async()=>{ //Realiza peticiones Get al backend de las historial
        await axios.get(baseUrlHistorialSalario+`/${cedula}`)
        .then(response=>{
            setHistorial(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGetHistorial();
      
        
    }, [])



    return (// metodo que despliega la tabla que muestra los datos del profesor 
        <div className = "col-sm-8">
          <br/> 
        <h2 className="text-center offset-md-5 font-weight-bold">Historial de Salarios</h2>
           
        <table className="mt-5 offset-md-3 table table-hover"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Salario</th>
                </tr>
            </thead>
            <tbody>
            {historial.map(historia=>(
                        <tr  key ={historia.cedula, historia.inicio, historia.fin}>
                        <td>{historia.inicio}</td>
                        <td>{historia.fin}</td>
                        <td>{historia.monto}</td>
                        
                     </tr>  
                     ))}  
                
            </tbody>
        </table>
        </div>
    )

}