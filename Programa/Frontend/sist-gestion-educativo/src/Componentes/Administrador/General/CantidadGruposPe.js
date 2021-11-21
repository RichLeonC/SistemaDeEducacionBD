import React,{useState,useEffect} from 'react';
import {Pie , Doughnut} from 'react-chartjs-2';
import axios from 'axios';


export default function CantidadGruposPe(){
    const baseUrlPeriodoGrupo = "https://localhost:44307/api/CantidadGrupos";
    const [dataPeriodos,setDataPeriodos] = useState([]);
    var periodo = dataPeriodos.map(es=> es.numero);
    var cantidad= dataPeriodos.map(cantidad=> cantidad.cantidadGrupos);
  

    
    const data={
        labels: PeriodosAnno(),
      
        datasets:[{
            backgroundColor: ['#6C63FF', '#5757AF', '#8F8FC3', '#BAB8EF'],
            data: cantidad

        }]
       
    };

    
    function PeriodosAnno(){
        let grados =[];

        for(let grado of dataPeriodos){
            grados.push("Periodo "+grado.numero + " Año " + grado.anno);
        }
        return grados;
    }

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
           
            <Doughnut  data={data} options={opciones}/>

        </div>



    )







}