import React, { Component } from 'react';
import { Card, Nav, Tab, Tabs, Sonnet } from 'react-bootstrap';
import "./RestaurantMenu.css";
import ProductCard from "./ProducCard.js";
import { Scrollbars } from 'react-custom-scrollbars';
import imgHamburguesa from "../img/hamburguesa.jpg";
import imgPostre from "../img/postre.jpg";
import imgCocaCola from "../img/cocacola.jpg";

class RestaurantMenu extends Component {

    render() {
        return (
            <div class="menu-card">
                <div class="menu-card-header">
                    <h4 class="menu-title">Menu</h4>
                    <Tabs 
                        defaultActiveKey="platosprincipales" 
                        transition={false} 
                        id="uncontrolled-tab-example">
                        <Tab eventKey="platosprincipales" title="platosprincipales">
                        <div class="menu-card-body">
                                <div class="products-contaniner" id="postres">
                                    <Scrollbars>
                                        <ProductCard 
                                            imagen={imgHamburguesa}
                                            title="Hamburguesa"
                                            descripcion="carne, pan y tomate"
                                            price="$ 15.000"/>
                                    </Scrollbars>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="postres" title="postres">
                            <div class="menu-card-body">
                                <div class="products-contaniner" id="postres">
                                    <Scrollbars>
                                        <ProductCard 
                                            imagen={imgPostre}
                                            title="Postre de Milo"
                                            descripcion="chocolate y demas"
                                            price="$ 12.000"/>
                                    </Scrollbars>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="bebidas" title="bebidas" >
                        <div class="menu-card-body">
                                <div class="products-contaniner" id="postres">
                                    <Scrollbars>
                                        <ProductCard 
                                            imagen={imgCocaCola}
                                            title="Coca Cola"
                                            descripcion="coca y cola"
                                            price="$ 5.000"/>
                                    </Scrollbars>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default RestaurantMenu;