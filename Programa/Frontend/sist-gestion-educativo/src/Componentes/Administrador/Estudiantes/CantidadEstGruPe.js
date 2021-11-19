import React,{useState,useEffect} from 'react';
import { ModalHeader,Modal,ModalBody,Button,Form,Select,ModalFooter} from 'reactstrap'
import {Pie} from 'react-chartjs-2';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

export default function CantidadEstGruPe() {
    const data={
        labels: ['Adrian','Melissa','Richard'],
        datasets:[{
            backgroundColor: ['blue', 'yellow', 'red'],
            data: [89,85,88]

        }]
    
    };

    const opciones ={
        responsive: true,
        
    }

    return (
        <div>
            <h1> Hola </h1>
            <Pie  data={data} options={opciones}       />
        </div>


    )



}