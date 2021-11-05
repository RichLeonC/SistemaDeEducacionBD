import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function InfoPadre() {
    const cookies = new Cookies();
    const baseUrl = "https://localhost:44329/api/Padre_Vistas/"+cookies.get("cedula");

    const [dataPadre,setDataPadre]=useState([]);

    const peticionGet = async()=>{ //Realiza peticiones Get al backend
        await axios.get(baseUrl)
        .then(response=>{
            setDataPadre(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    

    return (
        <div className="col-sm-8">
             <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Información Personal</h2>
            
        </div>
    )
}
