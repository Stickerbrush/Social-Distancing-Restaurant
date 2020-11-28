import React, { Component } from "react";
import { Table, Button, Form } from 'react-bootstrap';
import "./ReservationManagement.css";
import axios from "axios";

export class ReservationManagement extends Component {
 /*
 updateMapa(){

    }

  */
    constructor(props) {
        super(props)
        this.state = {
            to_book_hour: '',
            to_book_date: '',
            to_book_table: 1,
            send_disabled: false,
            valid_hour: false,
            highlighted_row: -1,
            to_delete_hour: '',
            to_delete_date: '',
            delete_disabled: false,
            fetched_reservations: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendReserva = this.sendReserva.bind(this);
        this.deleteReserva = this.deleteReserva.bind(this);
        this.buildReservationInfo = this.buildReservationInfo.bind(this);
        this.renderReservationData = this.renderReservationData.bind(this);
        this.getTodayDate = this.getTodayDate.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }


    handleChange(e){

        const {name, value, validity} = e.target;
        if(validity.valid){
            this.setState({[name]: value});
        } else {
            this.setState({[name]: ''});
        }
    }

    handleSubmit(){
        this.setState({send_disabled: true}, this.sendReserva());
    }

    handleDelete(){
        this.setState({delete_disabled: true}, this.deleteReserva());
    }

    handleRowClick(index, fecha, hora){
        this.setState({
            highlighted_row: index,
            to_delete_hour: hora,
            to_delete_date: fecha
        })
    }

    getTodayDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd;
        var oneYearLater = (yyyy+1)+'-'+mm+'-'+dd;
        return [today, oneYearLater];
    }

    sendReserva(){
        let postData = {
            fecha: this.state.to_book_date,
            hora: this.state.to_book_hour,
            mesa: this.state.to_book_table,
            cliente_cedula: this.props.cedulaCliente
        }

        axios.post(global.fetch_addr + "/reservas", postData)
            .then((response) => {
                if(response.data.error){
                    alert(response.data.message)
                }else{
                    alert("Reserva creada con éxito")
                    let test = this.state.fetched_reservations

                    test.push(this.buildReservationInfo(response.data))
                    this.setState({
                        send_disabled: false,
                        fetched_reservations: test
                        }
                    )
                    console.log(this.state.fetched_reservations)
                }
            })
            .catch(err=>{
                this.setState({
                    send_disabled: false,
                }, alert(JSON.parse(JSON.stringify(err.response)).data));
            })
    }

    deleteReserva(){
        var fecha =  this.state.to_delete_date;
        fecha = fecha.replaceAll("/", "-");
        var hora = this.state.to_delete_hour;
        hora = hora.replaceAll(":", "-")
        var cliente_cedula = this.props.cedulaCliente;

        axios.delete(global.fetch_addr + "/reservasBorrar/" + cliente_cedula + "/" + fecha + "/" + hora)
            .then((response) => {
                if(response.data.error){
                    alert(response.data.message)
                }else{
                    alert("Reserva borrada con éxito")
                    let test = this.state.fetched_reservations
                    test.splice(this.state.highlighted_row)
                    this.setState({
                            delete_disabled: false,
                            fetched_reservations: test
                        }
                    )
                    console.log(this.state.fetched_reservations)
                }
            })
            .catch(err=>{
                this.setState({
                    delete_disabled: false,
                }, alert(JSON.stringify(err.response)));
            })
    }

    buildReservationInfo(response_data){
        return {nombre: this.props.nombreCliente,
                tel: this.props.telefonoCliente,
                fecha: response_data.fecha,
                mesa: response_data.mesa,
                hora: response_data.hora,
                hora_termina: response_data.hora_termina};
    }

    componentDidMount(){
        let cliente_cedula = this.props.cedulaCliente;
        axios.get( global.fetch_addr + "/reservasPorCliente/"  + cliente_cedula)
            .then(response => {
                let init_data = [];
                for(let i = 0; i < response.data.length; i++){
                    init_data.push( {
                        nombre: this.props.nombreCliente,
                        tel: this.props.telefonoCliente,
                        fecha: response.data[i].fecha,
                        mesa: response.data[i].mesa,
                        hora: response.data[i].hora,
                        hora_termina: response.data[i].hora_termina
                    })
                }
                console.log(response);
                this.setState({
                    fetched_reservations: init_data
                })
            })
    }

    renderReservationData(){
        const reservation_array = [...this.state.fetched_reservations];
        while (reservation_array.length < 3){
            reservation_array.push({nombre: "\u00a0",
                                    tel: "",
                                    fecha: "",
                                    mesa: "",
                                    hora: "",
                                    hora_termina: ""})
        }
        return reservation_array.map((reservation, index) => {
            const { nombre, tel, fecha, mesa, hora, hora_termina } = reservation //destructuring
            return (
                <tr key = {index}
                    onClick={() => this.handleRowClick(index, fecha, hora)}
                    style={this.state.highlighted_row === index ? {backgroundColor: "#ff834e"}
                                                                : {}}>
                    <td>{nombre}</td>
                    <td>{tel}</td>
                    <td>{fecha}</td>
                    <td>{mesa}</td>
                    <td>{hora}</td>
                    <td>{hora_termina}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="customerOptionsContainer">
                <div className="customerOptionsHijo">

                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className="text-titulo" >
                                Gestión de Reservas
                            </Form.Text>
                        </Form.Group>
                        <div className="search-reservation">
                            <div className="buttons-imputs">


                                <div className="test">
                                    <Form.Control type="time"
                                                  placeholder="Hora"
                                                  name="to_book_hour"
                                                  min="12:00" max="19:30"
                                                  onChange={this.handleChange}
                                                  className="col-9">
                                    </Form.Control>
                                <span className="validity col-3"></span>
                                </div>
                                    <Form.Control type="date"
                                              placeholder="Fecha"
                                              name="to_book_date"
                                              min={this.getTodayDate()[0]} max={this.getTodayDate()[1]}
                                              onChange={this.handleChange}
                                     />

                                <Form.Control as="select" type="number"
                                              placeholder="Mesa"
                                              name="to_book_table"
                                              min="1" max="5"
                                              onChange={this.handleChange}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>


                                <div className="buttons-group">
                                    <Button
                                        onClick={this.handleSubmit}
                                        variant="default"
                                        disabled={(this.state.to_book_hour === '' ||
                                                  this.state.to_book_date === '') ||
                                                  this.state.send_disabled}
                                        style={{ color: "white", background: "#FF834E" }}>
                                        Agendar
                                    </Button>
                                    <Button
                                        onClick={this.handleDelete}
                                        variant="default"
                                        style={{ color: "white", background: "#FF834E"}}
                                        disabled= {(this.state.to_delete_hour === '' ||
                                                    this.state.to_delete_date === '') ||
                                                    this.state.delete_disabled}
                                    >

                                        Borrar
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </Form>
                    <br></br>
                    <div className="table-container">
                        <Table striped bordered hover size="sm" variant="light">
                            <thead>
                            <tr>
                                <th>CLIENTE</th>
                                <th>TELEFONO</th>
                                <th>FECHA</th>
                                <th>MESA</th>
                                <th>HORA</th>
                                <th>TERMINA</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderReservationData()}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}
export default ReservationManagement;