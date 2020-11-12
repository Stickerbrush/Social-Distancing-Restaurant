import React, { Component } from 'react';
import { Card, Nav } from 'react-bootstrap';
import "./RestaurantMenu.css";

class RestaurantMenu extends Component {

    render() {
        return (
            <Card bg="dark" text="white">
                <Card.Header >
                    
                    <Card.Title>Menu</Card.Title>
                    <Nav variant="tabs" defaultActiveKey="#platosprincipales">
                        <Nav.Item>
                            <Nav.Link href="#platosprincipales">Platos principales</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#postres">Postres</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#bebidas">Bebidas</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
export default RestaurantMenu;