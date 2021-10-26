import { colors } from '@material-ui/core'
import React from 'react'
import { Card,ListGroup,Table} from 'react-bootstrap';
import Cookies from 'universal-cookie';

export default function InfoEstudiante() {
    const cookies = new Cookies();
    return (
        <Table className="mt-5 offset-md-1 table table-hover"striped bordered hover variant="light">
            <thead>
                <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellido1</th>
                <th>Apellido2</th>
                <th>Sexo</th>
                <th>Fecha Nacimiento</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{cookies.get("cedula")}</td>
                <td>{cookies.get("nombre")}</td>
                <td>{cookies.get("apellido1")}</td>
                <td>{cookies.get("apellido2")}</td>
                <td>{cookies.get("sexo")}</td>
                <td>{cookies.get("fechaNacimiento")}</td>
                </tr>
                
            </tbody>
        </Table>
    )
}
