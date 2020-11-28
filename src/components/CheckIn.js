import React, { Component } from "react";
import { Table, Button, Form } from 'react-bootstrap';
import "./CheckIn.css";
import logo from "../img/Logo-MataHambre.svg";

export class CheckIn extends Component {

    render() {
        return (
            <div className="customerOptionsContainer">
                <div className="customerOptionsHijo">

                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className="text-titulo" >
                                Ingreso al Restaurante
                            </Form.Text>
                        </Form.Group>
                        <div className = "search-reservation">
                            <div className = "buttons-imputs">
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control placeholder="ID Reserva" />
                                    <Form.Control placeholder="Telefono (opcional)" />
                                    <Form.Control placeholder="Nombre (opcional)" />
                                </Form.Group>
                                <Button
                                    onClick={this.props.clickCerrarLogin}
                                    variant="default"
                                    type="submit"
                                    style={{ color: "white", background: "#FF834E" }}>
                                    Buscar
                                </Button>
                                <Button
                                    onClick={this.props.clickCerrarLogin}
                                    variant="default"
                                    type="submit"
                                    style={{ color: "white", background: "#FF834E" }}>
                                    Ingresar
                                </Button>
                            </div>
                            <div className="logo-container-reservation">
                                <img
                                    src={logo}
                                    width="100"
                                    height="100"
                                    alt="React Bootstrap logo" />
                                <p className="text-matahambre">MataHambre </p>
                            </div>
                        </div>
                    </Form>
                    <br></br>
                    <Table striped bordered hover size="sm" variant="light">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>CLIENTE</th>
                            <th>FECHA</th>
                            <th>TELEFONO</th>
                            <th># DE MESA</th>
                            <th>COMIENZA</th>
                            <th>TERMINA</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>4/11/2020</td>
                            <td>316 655 2455</td>
                            <td>1</td>
                            <td>12:30</td>
                            <td>17:30</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>4/11/2020</td>
                            <td>311 444 0022</td>
                            <td>3</td>
                            <td>12:30</td>
                            <td>17:30</td>
                        </tr>
                        <tr>
                            <td> 3</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> 4</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> 5</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default CheckIn;