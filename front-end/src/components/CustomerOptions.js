import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import "./CustomerOptionsStyle.css";

export default class CustomerOptions extends Component {

    ReservarEvent() {
        alert("ReservarEvent!");
    }

    IngresarAlRestauranteEvent() {
        alert("IngresarAlRestauranteEvent!");
    }

    render() {
        return (
            <div className="customerOptionsContainer">
                <div className="customerOptionsHijo">
                    <h1 className="text-titulo" >¿Que desea hacer ahora?</h1>
                    <br />
                    <div className="buttonGroup">
                        <Button
                            variant="light"
                            size="lg"
                            onClick={this.ReservarEvent}>
                            Reservar
                        </Button>
                        <Button
                            variant="light"
                            size="lg"
                            onClick={this.IngresarAlRestauranteEvent}>
                            Ingresar al restaurante
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

