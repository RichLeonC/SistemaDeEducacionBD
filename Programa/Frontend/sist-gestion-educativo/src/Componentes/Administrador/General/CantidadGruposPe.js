import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import {Pie} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';


export default function CantidadGruposPe(){
    const baseUrlPeriodoGrupo = "https://localhost:44307/api/CantidadGrupos";
    const [dataPeriodos,setDataPeriodos] = useState([]);
    var periodo = dataPeriodos.map(es=> es.numero);
    var cantidad= dataPeriodos.map(cantidad=> cantidad.cantidadGrupos);


    
    const data={
        labels: periodo,
        datasets:[{
            backgroundColor: ['#6C63FF', '#5757AF', '#8F8FC3', '#BAB8EF'],
            data: cantidad

        }]
    
    };

    const opciones ={
        presponsive: true,
        maintainAspectRatio: false
        
    }




    const peticionGetPeriodos = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlPeriodoGrupo)
        .then(response=>{
            setDataPeriodos(response.data);
            console.log(dataPeriodos);
        }).catch(error=>{
            console.log(error);
        })
    }


    
    useEffect(() => { //Hace efecto la peticion
        
        peticionGetPeriodos();

    }, [])




    return (
        <div style={{width: '90%', height: '500px'}}>
           
            <Pie  data={data} options={opciones}/>

        </div>



    )







}