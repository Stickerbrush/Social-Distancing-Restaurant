import React, { Component } from 'react';
import "./styles/ChatGroup.css";
import Chat from "./Chat.js";
import RestaurantMap from "./RestaurantMap";
import {Route, Switch} from "react-router-dom";

class ChatGroup extends Component {

    render() {
        return (
            <div >


                        <Switch>
                            <Route path="/chat" render = {() => <Chat      nombreCliente = {this.props.nombreCliente}
                                                              telefonoCliente = {this.props.telefonoCliente}
                                                              cedulaCliente = {this.props.cedulaCliente}
                                                              clienteMesa = {this.props.clienteMesa}
                                                              clienteCheckedIn = {this.props.clienteCheckedIn}/> } />


                        </Switch>

                <RestaurantMap cedulaCliente = {this.props.cedulaCliente}/>
            </div>
        );
    }
}
export default ChatGroup;