import React, {Component} from 'react'
import {Dropdown} from "react-bootstrap";
import "./styles/DropdownBill.css"
import jwt from "jsonwebtoken";

class DropdownBill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bill_items: ''
        }

        this.renderDropdownItems = this.renderDropdownItems.bind(this);
    }

 /*   componentDidMount() {

    }
   */
    componentWillUpdate(){
        this.renderDropdownItems();
    }

    updateBill = () => {
        const token = localStorage.getItem('token-current-bill')
        let current_bill = []
        if(token){
            current_bill = jwt.verify(token, 'theBill').bill_items
            this.setState({
                bill_items: current_bill
            })
        }
    }


    renderDropdownItems(){
        let bill_items = [...this.state.bill_items]

        return bill_items.map((dish, index) => {
            const {id, nombre_plato, precio_plato} = dish //destructuring
            return (
                <div>
                <div className="row" key={index}>
                    <div className="colProductoHijo col-sm text-light" id={id}>
                        {nombre_plato}
                    </div>
                    <div className="colPrecioHijo col-sm text-light">
                        <b>{"$" + precio_plato.toLocaleString().replaceAll(",", ".")}</b>
                    </div>

                </div>
                    <Dropdown.Divider />
                </div>
        )
        })

    }


    render() {
        return (
            <Dropdown drop = {'down'}
                      menualign={'left'}
                      onClick = {this.updateBill}>
                <Dropdown.Toggle className="bg-transparent                                            bg-transparent
                                            shadow-none
                                            border-0"id="dropdown-basic"

                >
                    Cuenta actual
                </Dropdown.Toggle>

                <Dropdown.Menu  className ="text-success row">

                    <div className="row">
                        <div className="colProducto col-sm text-light">
                            <b>Plato</b>
                        </div>
                        <div className="colPrecio col-sm text-light">
                            <b>Precio</b>
                        </div>
                    </div>
                    <Dropdown.Divider />

                    {this.renderDropdownItems()}

                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
export default DropdownBill;