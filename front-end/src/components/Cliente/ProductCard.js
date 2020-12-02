import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import "./styles/ProductCard.css";

class ProductCard extends Component {
    render() {
        return (
            <Card className ="food-card" style={{ width: '18rem'}} onClick = {this.props.onClick}>
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