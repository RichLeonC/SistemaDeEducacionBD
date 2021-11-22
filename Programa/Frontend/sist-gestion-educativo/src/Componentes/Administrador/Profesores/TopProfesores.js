
import React,{useState,useEffect} from 'react';
import axios from 'axios';
export default function TopProfesores() {
    const baseUrl = "https://localhost:44329/api/Profesor_Vistas/1/1";

    const [dataProfesores,setDataProfesores] = useState([]);
    
    const peticionGetProfes= async()=>{ //Realiza peticiones Get al backend 
        await axios.get(baseUrl)
        .then(response=>{
            setDataProfesores(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => { //Hace efecto la peticion
        peticionGetProfes();
        
        
    }, [])
    return (
        <div  className="col-sm-8">
             <br/>
            <h2 className="text-center offset-md-5 font-weight-bold">Top 10 profesores con más aumento salarial</h2>
        <table className="table table-hover mt-5 offset-md-3"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Nombre Completo</th>
                <th>Salario inicial(₡)</th>
                <th>Salario Actual (₡)</th>
                <th>Aumento (₡)</th>

                </tr>
            </thead>
            <tbody>
                {
                    dataProfesores.map(profe=>(
                        <tr>
                        <td>{profe.nombreCompleto}</td>
                        <td>{profe.salarioInicial}</td>
                        <td>{profe.salarioActual}</td>
                        <td>{profe.aumento}</td>
                        </tr>
                    ))
                }
               
                
            </tbody>
        </table>
        </div>
    )
}
