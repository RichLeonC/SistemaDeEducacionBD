
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
export default function AsistenciaEstudiante() {
<<<<<<< Updated upstream
=======
    const cookies = new Cookies();
    const baseUrl = "https://localhost:44329/api/Asistencia_Estudiantes/"+cookies.get("cedula")+"/1";
    const baseUrlPeriodos = "https://localhost:44329/api/periodos";
    const baseUrlGrupos = "https://localhost:44329/api/grupos";
    const baseUrlMatriculas = "https://localhost:44329/api/matriculas/"+cookies.get("cedula")+"/1";
   

    const [dataAsistencia,setDataAsistencia] = useState([]);
    const [dataPeriodos,setDataPeriodos] = useState([]);
    const [dataMatriculas,setDataMatriculas] = useState([]);
    const [dataGrupos,setDataGrupos] = useState([]); //Estado para los grupos
    const [codigoSeleccionado,setCodigoSeleccionado] = useState([]);
    const [numSeleccionado, setNumSeleccionado] = useState([]);
    const [annoSeleccionado, setAnnoSeleccionado] = useState([]);
    const [modalFiltro,setModalFiltro] = useState(false);

    const abrirCerrarModalFiltro=()=>{ //Cambia el estado del modal de filtro (abierto o cerrado)

        setModalFiltro(!modalFiltro);
        if(modalFiltro == false){
            peticionGetAsistencia();
        }
    }

    const handlerOpcionCodigo=e=>{ 
        const opcion = e.target.value;
        setCodigoSeleccionado(opcion);
        console.log(codigoSeleccionado);
    }

    const handlerOpcionNum=e=>{  //Handler para guardar en el estado el numero de periodo escogidp
        const opcion = e.target.value;
        setNumSeleccionado(opcion);
        console.log(opcion);
    }

    const handlerOpcionAnno=e=>{  //Handler para guardar en el estado el numero de periodo escogidp
        const opcion = e.target.value;
        setAnnoSeleccionado(opcion);
        console.log(opcion);
    }

    const peticionGetAsistencia = async()=>{ //Realiza peticiones Get al backend Grupos
       // console.log(baseUrl);
        await axios.get(baseUrl)
        .then(response=>{
            setDataAsistencia(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetPeriodos = async()=>{ //Realiza peticiones Get al backend Periodos
        await axios.get(baseUrlPeriodos)
        .then(response=>{
            setDataPeriodos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetMatriculas = async()=>{ //Realiza peticiones Get al backend Matriculas
        await axios.get(baseUrlMatriculas)
        .then(response=>{
            setDataMatriculas(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const peticionGetGrupos = async()=>{ //Realiza peticiones Get al backend Grupos
        await axios.get(baseUrlGrupos)
        .then(response=>{
            setDataGrupos(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    function filtroNumerosPeriodo(){ //Omite los numeros de periodo duplicados
        let filtradosP = [];
        
        for(let periodo of dataPeriodos){
            if(!filtradosP.includes(periodo.numero)){
                filtradosP.push(periodo.numero);
            }
            
        }
        return filtradosP;

    }

    function filtroAnnosPeriodo(){ //Omite los numeros de año duplicados
        let filtradosA = [];

        for(let periodo of dataPeriodos){
            if(!filtradosA.includes(periodo.anno)){
                filtradosA.push(periodo.anno);
            }
            
        }
        return filtradosA;
    }

    function soloCodigos(){
        let codigos =[];
        for (let grupo of gruposEstudiante){
            codigos.push(grupo.codigoNombre);
        }
        return codigos;
    }

    const asistenciasFiltradas=()=>{
        abrirCerrarModalFiltro();
        console.log("Data asistencia antes: "+dataAsistencia);
        setDataAsistencia(dataAsistencia.filter(grupo=>grupo.numPeriodo == numSeleccionado && grupo.anno == annoSeleccionado && grupo.codigoGrupo==codigoSeleccionado));
        console.log("Data asistencia despues: "+dataAsistencia.map(data=>data.codigoGrupo));
    }

   
    
    
    const gruposEstudiante = dataGrupos.filter(grupo=>dataMatriculas.find(m=>m.codigoGrupo==grupo.codigoNombre));

    useEffect(() => { //Hace efecto la peticion
        peticionGetAsistencia();
        peticionGetPeriodos();
        peticionGetMatriculas();
        peticionGetGrupos();
    }, [])
>>>>>>> Stashed changes
    return (
        <div>
            
        </div>
    )
}
