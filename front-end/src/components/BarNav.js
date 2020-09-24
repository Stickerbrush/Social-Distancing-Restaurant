import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import "./BarNav.css";
import logo from "../img/Logo-MataHambre.svg";

export default class BarNav extends Component {
    render() {
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
                        <Nav.Link href="#deets">Registrarse</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">Acceder</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

