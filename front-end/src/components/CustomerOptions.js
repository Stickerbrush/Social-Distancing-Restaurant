import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import "./CustomerOptionsStyle.css";
import { Redirect } from "react-router-dom";
export class CustomerOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect : ''
        };

        this.reservarEvent = this.reservarEvent.bind(this);
        this.ingresarAlRestauranteEvent = this.ingresarAlRestauranteEvent.bind(this);
    }
    
    reservarEvent() {
        this.setState({redirect: 'reservas'})
    }

    ingresarAlRestauranteEvent() {
        alert("Still under construction!")
    }

    render() {
        if(this.state.redirect === 'reservas'){
            return(<Redirect to="/reservas"/>)
        }

        return (
                <div className="customerOptionsContainer">
                    <div className="customerOptionsHijo">
                        <h1 className="text-titulo" >¿Que desea hacer ahora? </h1>
                        <br />
                        <div className="buttonGroup">

                            <Button
                                variant="light"
                                size="lg"
                                onClick={this.reservarEvent}>
                                Reservar
                        </Button>
                            <Button
                                variant="light"
                                size="lg"
                                onClick={this.ingresarAlRestauranteEvent}>
                                Ingresar al restaurante
                        </Button>
                        </div>
                    </div>
                </div>
        );
    }
}

export default CustomerOptions;
