import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import {Bar} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';


export default function Top15Grupos(){
    const baseUrlTop15 = 'https://localhost:44307/api/Top15Grupos';
    const [dataTop15, setdatTop15]= useState([]);


    const peticionGetTop = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlTop15 )
        .then(response=>{
            setdatTop15(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => { //Hace efecto la peticion
  
        peticionGetTop();
    }, [])


    return (
        <div  className="col-sm-8">
            <br/>
            <h2 className="offset-md-3 -weight-bold">Top 15 Grupos con mejor record de aprobación</h2>
            <table className="table table-hover mt-5 offset-md-3"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Grupo</th>
                <th>Periodo</th>
                <th>Año</th>
                <th>Porcentaje Aprobación</th>
                <th>Profesor</th>
                <th>Grado</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataTop15.map(info=>(
                        <tr>
                        <td>{info.codigoGrupo}</td>
                        <td>{info.numPeriodo}</td>
                        <td>{info.anno}</td>
                        <td>{info.porcentajeAprobado}</td>
                        <td>{info.profesorImparte}</td>
                        <td>{info.grado}</td>
                        </tr>
                    ))
                }
               
                
            </tbody>
        </table>









        </div>
    )


}