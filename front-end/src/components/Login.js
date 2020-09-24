import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import "./LoginStyle.css";

export default class Login extends Component {
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
                            <Form.Check inline type="checkbox" label="Recordarme?" className="check-switch-checkbox"/>
                            <Form.Check inline type="switch" label="Trabajador?" className="check-switch-checkbox"/>
                        </Form.Group>
                        <Button variant="default" type="submit" style={{ color:"white", background:"#FF834E"}}>
                            Acceder
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

