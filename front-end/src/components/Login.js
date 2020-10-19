import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import "./LoginStyle.css";

export class Login extends Component {

    constructor() {
        super()
        this.state = {
            mostrar: true
        };
    }

    static myInstance = null;

    /**
     * @returns {Login}
     */
    static getInstance() {
        if (Login.myInstance == null) {
            Login.myInstance = new Login();
        }

        return this.myInstance;
    }

    Mostrar(){this.setState({mostrar: true})}
    Ocultar(){this.setState({mostrar: false})}

    AccederEvent() {
        this.Ocultar()
    }

    render() {
        return (
            <div>
                {
                    this.state.mostrar ?
                        <div className="loginContainer">
                            <div className="loginContainerHijo">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Text className="text-titulo" >
                                            Iniciar Sesión
                            </Form.Text>
                                        <Form.Control type="email" placeholder="Nombre" />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Telefono" />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check
                                            inline
                                            type="checkbox"
                                            label="Recordarme?"
                                            className="check-checkbox" />
                                        <Form.Check
                                            inline
                                            type="switch"
                                            id="custom-switch"
                                            label="Trabajador?"
                                            className="check-switch" />
                                    </Form.Group>
                                    <Button
                                        onClick={()=>this.AccederEvent()}
                                        variant="default"
                                        type="submit"
                                        style={{ color: "white", background: "#FF834E" }}>
                                        Acceder
                                    </Button>
                                </Form>
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }
}
export default Login;