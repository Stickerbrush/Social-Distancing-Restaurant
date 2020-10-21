import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import "./LoginStyle.css";
import CustomerOptions from "./CustomerOptions";

export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mostrar: true
        };
    }

    AccederEvent() {
        
    }


    render() {
        return (
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
                            onClick={this.props.clickCerrarLogin}
                            variant="default"
                            type="submit"
                            style={{ color: "white", background: "#FF834E" }}>
                            Acceder
                                    </Button>
                    </Form>
                </div>
            </div >
        );
    }
}
export default Login;
