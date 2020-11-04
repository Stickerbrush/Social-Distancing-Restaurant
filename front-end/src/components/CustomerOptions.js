import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import "./CustomerOptionsStyle.css";

export class CustomerOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mostrar: true
        };
    }
    
    ReservarEvent() {
        
    }

    IngresarAlRestauranteEvent() {
        alert("IngresarAlRestauranteEvent!");
    }

    render() {
        return (
            this.state.mostrar ?
                <div className="customerOptionsContainer">
                    <div className="customerOptionsHijo">
                        <h1 className="text-titulo" >¿Que desea hacer ahora? </h1>
                        <br />
                        <div className="buttonGroup">

                            <Button
                                variant="light"
                                size="lg"
                                onClick={this.props.clickOpen}>
                                Reservar
                        </Button>
                            <Button
                                variant="light"
                                size="lg"
                                onClick={this.props.clickEnterTheRestaurant}>
                                Ingresar al restaurante
                        </Button>
                        </div>
                    </div>
                </div>
                : null
        );
    }
}

export default CustomerOptions;
