import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import "./styles/CustomerOptions.css";
import {Redirect, Route, Switch} from "react-router-dom";
import ChatGroup from "./ChatGroup";
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
        this.setState({redirect: 'checkin'})
    }

    render() {
        if( this.state.redirect=== 'reservas'){
            return(<Redirect to="/reservations"/>)
        } else  if(this.state.redirect === 'checkin'){
            return(<Redirect to="/checkin"/>)
        }

        return (
                <div className="customerOptionsContainer">
                    <div className="customerOptionsHijo">

                        <Switch>

                            <Route path="/chatgroup" component={ChatGroup} />
                        </Switch>

                        <h5 className="text-tituloh3" >Bienvenido {this.props.nombreCliente}  </h5>

                        <h1 className="text-tituloh1" >¿Qué desea hacer ahora? </h1>
                        <br />
                        <div className="buttonGroup">

                            <Button
                                variant="light"
                                size="lg"
                                onClick={this.reservarEvent}>
                                Gestionar reservas
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
