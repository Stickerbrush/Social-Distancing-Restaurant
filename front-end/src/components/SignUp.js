import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import "./SignUpStyle.css";
import "../global";

export class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            datos_cliente: '',
            cedula: '',
            nombre: '',
            telefono: '',
            password: '',
            redirect: false,
            sending: false
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.sendRegistro =  this.sendRegistro.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        this.setState({sending: true}, this.sendRegistro())
    }


    handleOnChange = e =>{
        const {name, value} = e.target
        this.setState({ [name]: value});
    }

    sendRegistro(){
        let postData = {
            cedula: this.state.cedula,
            nombre: this.state.nombre,
            telefono: this.state.telefono,
            password: this.state.password
        }

        axios.post(global.fetch_addr + "/clientes", postData)
            .then((response) => {
                if(response.data.error){
                    alert(response.data.message)
                }else{
                    alert("Usuario creado con exito")
                    this.setState({
                            datos_cliente: '',
                            cedula: '',
                            nombre: '',
                            telefono: '',
                            password: '',
                            redirect: true,
                            sending: false
                        }
                    )
                }
            })
            .catch(err=>{
                alert("Intente registrarse más tarde");
            })
    }


    render() {
        if(this.state.redirect){
            return(<Redirect to="/login"/>)
        }

        return (
            <div className="loginContainer">
                <div className="loginContainerHijo">
                    <Form>

                        <Form.Group>
                            <Form.Text className="text-titulo" >
                                Registrarse
                            </Form.Text>

                            <Form.Control name = "cedula"
                                          type="number"
                                          placeholder="Cedula"
                                          onChange = {this.handleOnChange}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Control name = "nombre"
                                          placeholder="Nombre"
                                          onChange = {this.handleOnChange}
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Control name = "telefono"
                                          type= "number"
                                          placeholder="Telefono"
                                          onChange = {this.handleOnChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control name= "password"
                                          type="password"
                                          placeholder="Contraseña"
                                          onChange = {this.handleOnChange}
                            />
                        </Form.Group>


                        <Button
                            onClick={this.sendRegistro}
                            disabled={this.state.sending}
                            variant="default"
                            style={{ color: "white", background: "#FF834E" }}>
                            Registar
                        </Button>
                    </Form>
                </div>
            </div >
        );
    }
}
export default SignUp;