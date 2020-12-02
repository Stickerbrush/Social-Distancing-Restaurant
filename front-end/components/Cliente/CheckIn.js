import React, { Component } from "react";
import { Table, Button, Form } from 'react-bootstrap';
import "./styles/CheckIn.css";
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from "axios";
import {Redirect} from "react-router-dom";

export class CheckIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            to_book_hour: '',
            to_book_date: '',
            mesa_checkin: '',
            highlighted_row: '',
            client_latitude: '',
            client_longitude: '',
            restaurant_latitude: 53.575,
            restaurant_longitude: 10.0342,
            fetched_reservations: [],
            redirect: false
        };

        this.getCurrentPos = this.getCurrentPos.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.renderReservationData = this.renderReservationData.bind(this);
        this.measureDistance = this.measureDistance.bind(this);
        this.handleCheckIn = this.handleCheckIn.bind(this);

    }

    componentDidMount() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                this.setState({client_latitude: position.coords.latitude,
                                    client_longitude: position.coords.longitude})
            }, function error(msg) {alert('Please enable your GPS position feature.');},
                {maximumAge:10000, timeout:5000, enableHighAccuracy: true});

        }

        let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        });

        L.Marker.prototype.options.icon = DefaultIcon;
        console.log(this.measureDistance(53.575337, 10.034002, 53.575, 10.0342))
        //53.575, 10.0342 FIXED POINT

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

    componentWillUpdate(){
        this.getGeoLocation()
    }

    getCurrentPos(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                    console.log("Latitude is :", position.coords.latitude);
                    console.log("Longitude is :", position.coords.longitude);
                    return [position.coords.latitude, position.coords.longitude]
                }, function error(msg) {alert('Please enable your GPS position feature.');},
                {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
        }
    }

    handleCheckIn(){
        let dist_from_rest = this.measureDistance(this.state.client_latitude, this.state.client_longitude,
                                                  this.state.restaurant_latitude, this.state.client_longitude )

        let today = new Date();
        let res_date = this.state.to_book_date.split("/")
        let year = res_date[2];
        let month = res_date[1] - 1;
        let date = res_date[0];
        let split_hour = this.state.to_book_hour.split(":");
        let res_start_hour = new Date(year, month, date, split_hour[0], split_hour[1], 0, 0);
        let res_time_treshold = new Date(year, month, date, split_hour[0], split_hour[1], 0, 0);
        res_time_treshold.setTime(res_time_treshold.getTime() + (0.5*60*60*1000));

        if(dist_from_rest >= 40.0 &&  !(today >= res_start_hour && today <= res_time_treshold)) {
            this.props.handleCheckin(true, this.state.mesa_checkin)
            this.setState({redirect: true})
        } else {
            console.log(dist_from_rest)
            console.log(dist_from_rest < 40.0)
            if(dist_from_rest > 40.0){
                alert("No se encuentra lo suficientemente cerca del restaurante para hacer check-in")
            } else if(!(today >= res_start_hour && today <= res_time_treshold)){
                alert("No se encuentra en la fecha u hora correcta para la reserva seleccionada")
            }
        }
    }

    handleRowClick(index, fecha, hora, mesa){
        this.setState({
            highlighted_row: index,
            to_book_hour: hora,
            to_book_date: fecha,
            mesa_checkin: mesa
        })
    }

    measureDistance(lat1, lon1, lat2, lon2){  // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d * 1000; // meters
    }

    calculateCheckinTreshold(hora){
        console.log("zdzdxd")
        var split_hour = hora.split(":");
        var time_res = new Date(2000, 1, 1, split_hour[0], split_hour[1], 0, 0);
        time_res.setTime(time_res.getTime() + (4*60*60*1000));
        //time_res = time_res.getHours() + ":" + time_res.getMinutes()
        return time_res;
    }

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState({
                        client_latitude: position.coords.latitude,
                        client_longitude: position.coords.longitude
                    })
                }, function error(msg) {},
                {maximumAge:10000, timeout:5000, enableHighAccuracy: true});

        }
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
                    onClick={() => this.handleRowClick(index, fecha, hora, mesa)}
                    style={this.state.highlighted_row === index ? {backgroundColor: "#ff834e"}
                        : {}} >
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
        if( this.state.redirect=== true){
            return(<Redirect to="/chat"/>)
        }

        return (
            <div className="customerOptionsContainer">
                <div className="customerOptionsHijo">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className="text-titulo" >
                                Ingreso al Restaurante
                            </Form.Text>
                        </Form.Group>
                        {/*[53.575, 10.0342]*/}
                            <MapContainer center={[this.state.restaurant_latitude, this.state.restaurant_longitude]} zoom={20}
                                          scrollWheelZoom={false}
                                          style={{height : '400px'}}
                            >
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker position={[this.state.client_latitude, this.state.client_longitude]} src = "../img/marker-icon.png">
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>

                            </MapContainer>



                    </Form>
                    <br></br>
                    <div className="table-container">
                        Por favor escoja la reserva con la que desea ingresar al restaurante
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

                        <div className="search-reservation">
                            <div className="buttons-imputs">

                                <div className="buttons-group">
                                    <Button
                                        onClick={this.handleCheckIn}
                                        variant="default"
                                        type="submit"
                                        disabled={ this.state.to_book_hour === '' || this.state.to_book_date === ''}
                                        style={{ color: "white", background: "#FF834E"}}>
                                        Ingresar
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckIn;