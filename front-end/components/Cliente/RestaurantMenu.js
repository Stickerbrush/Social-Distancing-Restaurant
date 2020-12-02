import React, { Component } from 'react';
import { CardColumns, Tab, Tabs, Modal, Button } from 'react-bootstrap';
import "./styles/RestaurantMenu.css";
import ProductCard from "./ProductCard.js";
import { Scrollbars } from 'react-custom-scrollbars';
import axios from "axios";
import jwt from "jsonwebtoken";

class RestaurantMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched_platos: [],
            selected_price: '',
            selected_dish: '',
            selected_dish_id: '',
            modal_enabled: false,
            bill_items: []
        }

        this.handleCardClick = this.handleCardClick.bind(this);
        this.renderCardData = this.renderCardData.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.addDishToBill = this.addDishToBill.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token-current-bill')
        let current_bill = []
        if(token){

            current_bill = jwt.verify(token, 'theBill').bill_items
        }

        axios.get( global.fetch_addr + "/platos")
            .then(response => {
                let init_data = [];
                for(let i = 0; i < response.data.length; i++){
                    init_data.push( {
                        id: response.data[i].id,
                        title: response.data[i].nombre,
                        descripcion: response.data[i].descripcion,
                        price: response.data[i].precio
                    })
                }
                this.setState({
                    fetched_platos: init_data,
                    bill_items: current_bill
                })
            })
    }

    handleCardClick(title, price, id){
        this.setState({
            selected_price: price,
            selected_dish: title,
            selected_dish_id: id,
            modal_enabled: true
        })
    }

    hideModal(){
        this.setState({modal_enabled: false});
    }

    addDishToBill(){
        let dish_array = [...this.state.bill_items]
        dish_array.push({id: this.state.selected_dish_id,
                         nombre_plato: this.state.selected_dish,
                         precio_plato: this.state.selected_price})

        const token = {bill_items: dish_array}
        localStorage.setItem('token-current-bill', jwt.sign(token, 'theBill'))
        this.setState({
            selected_dish_id: '',
            selected_dish: '',
            selected_price: '',
            modal_enabled: false,
            bill_items: dish_array
        })
    }

    renderCardData(Tipo){
        let dish_array = [];
        const images = require.context('../../img', true);
        for(let i = 0; i < this.state.fetched_platos.length; i++){
            if(this.state.fetched_platos[i].id.startsWith(Tipo)){
                dish_array.push(this.state.fetched_platos[i])
            }
        }


        return dish_array.map((dish, index) => {
            const { id, title, descripcion, price } = dish //destructuring
            let img = images('./' +  id + '.png');
            return (
                <ProductCard  key = {index}
                              imagen = {img}
                              title = {title}
                              onClick={() => this.handleCardClick(title, price, id)}
                              descripcion = {descripcion}
                              price = {"$" + price.toLocaleString().replaceAll(",", ".")}
                />
            )
        })

    }

    render() {

        return (
            <div className="menuContainer">
                <div className="menuContainerHijo">

                    <Modal show={this.state.modal_enabled} centered onHide = {this.hideModal}>
                        <Modal.Header closeButton >
                            <Modal.Title className = "text-center w-100 " >Confirmar Orden</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className = "text-center w-100 ">
                                    Desea añadir "{this.state.selected_dish}" a su pedido por
                                   {" $" + this.state.selected_price.toLocaleString().replaceAll(",", ".")} ?
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-center">
                            <Button variant="secondary" style={{ color: "white", background: "#333333" }} onClick={this.hideModal}>
                                Ir Atrás
                            </Button>
                            <Button variant="secondary" style={{ color: "white", background: "#FF834E" }} onClick={this.addDishToBill}>
                                Añadir
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="menu-card">
                            <div className="menu-card-header">
                                <h4 className="menu-title">Menu</h4>
                                <Tabs
                                    defaultActiveKey="platosprincipales"
                                    transition={false}
                                    id="uncontrolled-tab-example">
                                    <Tab eventKey="platosprincipales" title="Platos Principales">
                                        <div className="menu-card-body">
                                            <div className="products-contaniner" id="postres">
                                                <Scrollbars autoHide>
                                                    <CardColumns>
                                                        {this.renderCardData("P")}

                                                    </CardColumns>
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="postres" title="Postres">
                                        <div className="menu-card-body">
                                            <div className="products-contaniner" id="postres">
                                                <Scrollbars autoHide>
                                                    <CardColumns>
                                                        {this.renderCardData("D")}
                                                    </CardColumns>
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="bebidas" title="Bebidas" >
                                        <div className="menu-card-body">
                                            <div className="products-contaniner" id="bebidas">

                                                <Scrollbars autoHide>
                                                    <CardColumns>
                                                        {this.renderCardData("B")}
                                                    </CardColumns>

                                                </Scrollbars>

                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}
export default RestaurantMenu;