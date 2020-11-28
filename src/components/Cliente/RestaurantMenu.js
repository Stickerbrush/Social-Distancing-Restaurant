import React, { Component } from 'react';
import { CardColumns, Tab, Tabs } from 'react-bootstrap';
import "./RestaurantMenu.css";
import ProductCard from "./ProducCard.js";
import { Scrollbars } from 'react-custom-scrollbars';
import imgHamburguesa from "../../img/hamburguesa.jpg";
import imgPizza from "../../img/pizza.jpg";
import imgPostre from "../../img/postre.jpg";
import imgCocaCola from "../../img/cocacola.jpg";
import imgPepsi from "../../img/pepsi.jpg";

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
                        <Tab eventKey="platosprincipales" title="Platos Principales">
                            <div class="menu-card-body">
                                <div class="products-contaniner" id="postres">
                                    <Scrollbars>
                                        <CardColumns>
                                            <ProductCard
                                                imagen={imgHamburguesa}
                                                title="Hamburguesa"
                                                descripcion="carne, pan y tomate"
                                                price="$ 15.000" />
                                            <ProductCard
                                                imagen={imgPizza}
                                                title="Pizza"
                                                descripcion="jamon y tomate"
                                                price="$ 15.000" />
                                        </CardColumns>
                                    </Scrollbars>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="postres" title="Postres">
                            <div class="menu-card-body">
                                <div class="products-contaniner" id="postres">
                                    <Scrollbars>
                                        <CardColumns>
                                            <ProductCard
                                                imagen={imgPostre}
                                                title="Postre de Milo"
                                                descripcion="chocolate y demas"
                                                price="$ 12.000" />
                                        </CardColumns>
                                    </Scrollbars>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="bebidas" title="Bebidas" >
                            <div class="menu-card-body">
                                <div class="products-contaniner" id="bebidas">

                                    <Scrollbars>
                                        <CardColumns>
                                            <ProductCard
                                                imagen={imgCocaCola}
                                                title="Coca Cola"
                                                descripcion="coca y cola"
                                                price="$ 5.000" />
                                            <ProductCard
                                                imagen={imgPepsi}
                                                title="Pepsi"
                                                descripcion="pep y si"
                                                price="$ 5.000" />
                                        </CardColumns>
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