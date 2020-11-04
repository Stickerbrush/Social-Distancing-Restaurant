import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import history from '../history';
import axios from "axios";
import "./LoginStyle.css";

export class Login extends Component {
    fetch_addr = 'https://s-d-r-backend.herokuapp.com';
    state = {
        mostrar: true,
        datos_cliente: '',
        cedula: '',
        password: '',
        trabajador: false,
        sending: false
    };

    constructor(props) {
        super(props)
        this.getCliente = this.getCliente.bind(this);
        this.getEmpleado = this.getEmpleado.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
        this.handleToggleButton = this.handleToggleButton.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.changeRoute = this.changeRoute.bind(this);
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return null;
        };
    }

    changeRoute() {
        let path = 'mainmenu';
        history.push(path);
    }

    validateLogin(data) {
        console.log(data[0])
        console.log(data.length > 0)
        if(data.length > 0){
            alert("bienvenido/a " + data[0].nombre)
            history.push("/mainmenu")
            // this.props.clickCerrarLogin(this.state.datos_cliente)
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
        axios.get( this.fetch_addr + "/empleados/"  + empleado_id + "/" + contrasena_empleado)
            .then(response => {
                this.setState ({datos_cliente: response.data, sending: false},
                    this.validateLogin(response.data))
            })
    }

    getCliente(cedula_cliente, contrasena_cliente){
        let cedula = parseInt(cedula_cliente);
        axios.get(this.fetch_addr + "/clientes/"+  cedula+ "/"+ contrasena_cliente)
        .then(response => {
            this.setState ({datos_cliente: response.data, sending: false},
                this.validateLogin(response.data))
        })
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
