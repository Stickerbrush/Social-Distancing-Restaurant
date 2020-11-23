import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import "./RestaurantMenu.css";

class ProductCard extends Component {
    render() {
        return (
            <Card style={{ width: '18rem'}}>
                <Card.Img variant="top" src={this.props.imagen}/>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>Ingredientes: {this.props.descripcion} </Card.Text>
                    <Card.Text>{this.props.price}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
export default ProductCard;