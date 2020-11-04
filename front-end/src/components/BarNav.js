import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import "./BarNav.css";
import logo from "../img/Logo-MataHambre.svg";

export default class BarNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.redirectToRegistro = this.redirectToRegistro.bind(this);
    }

    redirectToRegistro(){
        this.setState({redirect: true})
    }

    render() {

        if(this.state.redirect){
            return(<Redirect to="/login"/>)
        }

        return (
            <Navbar className="Navbar" collapseOnSelect expand="lg" variant="dark">
                <div className="logo-container">
                    <img className="d-inline-block align-top"
                    src={logo} 
                    width="50" 
                    height="50"  
                    alt="React Bootstrap logo"/>
                    <p className="text-matahambre">MataHambre </p>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="/registro">Registrarse</Nav.Link>
                        <Nav.Link href="/login">Acceder</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

