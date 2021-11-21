import React,{useState,useEffect} from 'react';

import {Bar} from 'react-chartjs-2';

import axios from 'axios';

export default function CobrosFacturas() {

    const baseUrlCVS = "https://localhost:44329/api/Facturas/1/1";
    const [dataCVS,setDataCVS] = useState([]);

    const data={
        labels: dataCVS.map(cvs=>cvs.gradoPeriodo),
        datasets:[
        {
            label : 'Cobros',
            backgroundColor: '#61608E',
            boderColor: 'black',
            boderWidth: 1,
            hoverBackgroundColor: '#A09BF3',
            hoverBorderColor: '#FFFF',
            data: dataCVS.map(cvs=>cvs.cobros)
        },
        {
            label : 'Facturas',
            backgroundColor: '#8F8FC3',
            boderColor: 'black',
            boderWidth: 1,
            hoverBackgroundColor: '#A09BF3',
            hoverBorderColor: '#FFFF',
            data: dataCVS.map(cvs=>cvs.facturas)
        },
    ]
    
    };

    const data2={
        labels: dataCVS.map(cvs=>cvs.gradoPeriodo),
        datasets:[{
            label : 'Facturas',
            backgroundColor: '#61608E',
            boderColor: 'black',
            boderWidth: 1,
            hoverBackgroundColor: '#A09BF3',
            hoverBorderColor: '#FFFF',
            data:  dataCVS.map(cvs=>cvs.facturas),
        }]
    
    };

    
    const opciones ={
        maintainAspectRatio: false,
        presponsive: true,
    }

    const peticionGetCVS = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlCVS)
        .then(response=>{
            setDataCVS(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    

    useEffect(() => { //Hace efecto la peticion

        peticionGetCVS();

        
    }, [])
    return (
        
        <div style={{width: '90%', height: '500px'}}>
        <h2 className="offset-md-5 font-weight-bold">Cobros vs facturados por grado, por período</h2>
        <Bar className="offset-md-2 mt-5" data= {data} options={opciones}/>
        <br/>
       
        <br/>
        </div>
    )
}
