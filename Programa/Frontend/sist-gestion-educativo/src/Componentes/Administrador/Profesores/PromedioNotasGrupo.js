import React,{useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';


export default function PromedioNotasGrupos() {
    const baseUrlEvaluciones = "https://localhost:44307/api/Evaluacion_Grupo_Estudiante";
    const [notasPromedio, setNotasPromedio] = useState([]);
    
    const data={
        labels: ['España', 'Mexico', 'Costa Rica'],
        datasets:[{
            label : 'Promedio Notas',
            backgroundColor: '#61608E',
            boderColor: 'black',
            boderWidth: 1,
            hoverBackgroundColor: '#A09BF3',
            hoverBorderColor: '#FFFF',
            data: [25,63,25]

        }]
    
    };

    const opciones ={
        maintainAspectRatio: false,
        presponsive: true,
    }


    const cedulaProfe = 118180009;


    const peticionGetNotasEstudiante = async()=>{ //Realiza peticiones Get al backend 
        await axios.get(baseUrlEvaluciones+"/"+cedulaProfe+"/2")
        .then(response=>{
            setNotasPromedio(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }


    useEffect(() => { //Hace efecto la peticion
        peticionGetNotasEstudiante();
        
        
    }, [])




    return (
        <div style={{width: '100%', height: '500px'}}>
            <h2></h2>
            <Bar  data= {data} options={opciones}/>


        </div>
    )
}
