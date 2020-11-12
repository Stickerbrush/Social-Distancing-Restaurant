import React from 'react';
import './App.css';
import {Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import BarNav from "./components/BarNav";
import CustomerOptions from "./components/CustomerOptions";
import GestionReservasCliente from "./components/GestionReservasCliente";
import SignUp from "./components/SignUp";
import Chat from "./components/Chat";
import RestaurantMenu from "./components/RestaurantMenu";
export class App extends React.Component {
    state = {
        logged_user: ''
    }

    render() {
        return (
            <div className="App">
                <BarNav/>
                    <Switch>
                        <Route exact path="/" render={ ()=><Redirect to="/login"/>} />
                        <Route path="/login" component={Login} />
                        <Route path="/registro" component={SignUp} />
                        <Route path="/reservas" component={GestionReservasCliente} />
                        <Route path="/mainmenu" component={CustomerOptions}/>
                        <Route path="/chat" component={Chat} />
                        <Route path="/restaurantmenu" component={RestaurantMenu} />
                    </Switch>
            </div>
        );
    }
}

export default App;
