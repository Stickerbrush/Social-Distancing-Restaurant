import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import "../../global";
import "./styles/LoginStyle.css";
import {Redirect} from "react-router-dom";


export class Login extends Component {

    state = {
        mostrar: true,
        datos_cliente: '',
        cedula: '',
        password: '',
        trabajador: false,
        sending: false,
        redirect: false
    };

    constructor(props) {
        super(props)
        this.getCliente = this.getCliente.bind(this);
        this.getEmpleado = this.getEmpleado.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
        this.handleToggleButton = this.handleToggleButton.bind(this);
    }


    validateLogin(data) {
        if(data.length > 0){
            alert("bienvenido/a " + data[0].nombre)
            this.setState({redirect: true})
            if(data[0]["cedula"]){
                this.props.handleLogin(1, data[0]);
            } else if(data[0]["id"] && data[0]["tipo"] === "admin" ) {
                this.props.handleLogin(3, data[0]);
            } else {
                this.props.handleLogin(2, data[0]);
            }
        } else{
            alert("Login fallido, porfavor escriba las credenciales correctas");
        }
    }

    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value});
    }

    handleToggleButton(e){
        if(this.state.trabajador){
            this.setState({trabajador: false})
        } else {
            this.setState({trabajador: true})
        }
    }

    handleSubmit(e) {
        const cedula = this.state.cedula;
        const contrasena =  this.state.password;
        if(this.state.trabajador){
            this.setState({sending: true}, this.getEmpleado(cedula, contrasena))
        } else {
            this.setState({sending: true}, this.getCliente(cedula, contrasena));
        }
    }

    getEmpleado(empleado_id, contrasena_empleado){
        axios.get( global.fetch_addr + "/empleados/"  + empleado_id + "/" + contrasena_empleado)
            .then(response => {
                this.setState ({datos_cliente: response.data, sending: false},
                    this.validateLogin(response.data))
            })
    }

    getCliente(cedula_cliente, contrasena_cliente){
        let cedula = parseInt(cedula_cliente);
        axios.get(global.fetch_addr + "/clientes/"+  cedula+ "/"+ contrasena_cliente)
        .then(response => {
            this.setState ({datos_cliente: response.data, sending: false},
                this.validateLogin(response.data))
        })
    }

    render() {
        if(this.state.redirect){
            return(<Redirect to="/mainmenu"/>);
        }

        return (

                <div className="loginContainer">
                <div className="loginContainerHijo">
                    <Form>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className="text-titulo" >
                                Iniciar Sesión
                            </Form.Text>
                            <Form.Control type="number"
                                          placeholder={this.state.trabajador ? "ID Trabajador" :"Cedula"}
                                          name="cedula"
                                          onChange={this.handleChange}
                            />
                        </Form.Group>


                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password"
                                          name="password"
                                          placeholder="Contraseña"
                                          onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                                inline
                                type="switch"
                                id="custom-switch"
                                name = "trabajador"
                                label="Trabajador?"
                                className="check-switch"
                                onChange={this.handleToggleButton}
                            />

                            <Form.Check
                                inline
                                type="checkbox"
                                label="Recordarme?"
                                className="check-checkbox"
                            />
                        </Form.Group>
                        <Button
                            variant="default"
                            disabled={this.state.sending}
                            style={{ color: "white", background: "#FF834E" }}
                            onClick={this.handleSubmit}
                        >
                            Acceder
                        </Button>
                    </Form>
                </div>
            </div >
        );
    }
}
export default Login;
