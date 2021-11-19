import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import {Pie} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

export default function CantidadEstGruPe() {

    const baseUrlMatriculas = "https://localhost:44307/api/matriculas";


    const [dataMatricula, setDataMatricula]= useState([]);
     
    var grupos = dataMatricula.map(es=> es.codigoGrupo);
    var cantidad= dataMatricula.map(cantidad=> cantidad.cantidadEstudiantes);
  


    const data={
        labels: grupos,
        datasets:[{
            backgroundColor: ['#6C63FF', '#5757AF', '#8F8FC3', '#BAB8EF'],
            data: cantidad

        }]
    
    };


    const peticionGetMatricula= async()=>{ //Realiza peticiones Get al backend de las matriculas
        await axios.get(baseUrlMatriculas+"/"+ 2 + "/" + 2021 + "/4")
        .then(response=>{
            setDataMatricula(response.data);
            console.log(dataMatricula);
        }).catch(error=>{
            console.log(error);
        })
    }


    const opciones ={
        presponsive: true,
        maintainAspectRatio: false
        
    }

    

    useEffect(() => { //Hace efecto la peticion
        
        peticionGetMatricula();
        
    }, [])




    return (
        <div style={{width: '90%', height: '500px'}}>
            
            <Pie  data={data} options={opciones}/>
        </div>


    )



}