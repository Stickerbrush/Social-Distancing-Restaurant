import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Redirect, Link } from "react-router-dom";
import "./styles/BarNav.css";
import logo from "../../img/Logo-MataHambre.svg";
import { withRouter } from 'react-router'
import DropdownBill from "../Cliente/DropdownBill";

class BarNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.redirectToRegistro = this.redirectToRegistro.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    redirectToRegistro(){
        this.setState({redirect: true})
    }

    goBack(){
        this.props.history.goBack();
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
                <Navbar.Collapse  id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>

                        {this.props.isLogged ? this.props.clienteCheckedIn ? [ <Link key = "1"to="/chat">Inicio </Link>,
                                                                                <Link key = "2" to="/ordermenu">Menu </Link>,
                                                                                <DropdownBill key = "3"/>,
                                                                                <Link key = "4" to="/ordermenu" onClick={this.props.handleLogout} >Pagar</Link>]
                                                                            :[ <Nav.Link key = "1" href="/mainmenu" >Inicio</Nav.Link>,
                                                                                <Nav.Link key = "2" onClick={this.props.handleLogout} >Cerrar sesión</Nav.Link>]

                                             : [<Nav.Link key = "1" href="/register">Registrarse</Nav.Link>,
                                                <Nav.Link key = "2" href="/login">Acceder</Nav.Link>]
                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default BarNav = withRouter(BarNav);
