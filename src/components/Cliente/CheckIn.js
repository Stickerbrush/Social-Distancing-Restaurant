import React, { Component } from "react";
import { Table, Button, Form } from 'react-bootstrap';
import "./CheckIn.css";
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export class CheckIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: '',
            longitude: ''
        };

        this.getCurrentPos = this.getCurrentPos.bind(this);
    }

    componentDidMount() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                this.setState({latitude: position.coords.latitude,
                                    longitude: position.coords.longitude})
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

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                }, function error(msg) {},
                {maximumAge:10000, timeout:5000, enableHighAccuracy: true});

        }
    }

    render() {


        return (
            <div className="customerOptionsContainer">
                <div className="customerOptionsHijo">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className="text-titulo" >
                                Ingreso al Restaurante
                            </Form.Text>
                        </Form.Group>



                            <MapContainer center={[53.575, 10.0342]} zoom={20}
                                          scrollWheelZoom={false}
                                          style={{height : '400px'}}
                            >
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />



                                <Marker position={[this.state.latitude, this.state.longitude]} src = "../img/marker-icon.png">
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>

                            </MapContainer>


                        <div className="search-reservation">
                            <div className="buttons-imputs">

                                <div className="buttons-group">
                                        <Button
                                            onClick={this.props.clickCerrarLogin}
                                            variant="default"
                                            type="submit"
                                            style={{ color: "white", background: "#FF834E"}}>
                                            Ingresar
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
                            <tr>
                                <td>Mark</td>
                                <td>4/11/2020</td>
                                <td>316 655 2455</td>
                                <td>1</td>
                                <td>12:30</td>
                                <td>17:30</td>
                            </tr>
                            <tr>
                                <td>Jacob</td>
                                <td>4/11/2020</td>
                                <td>311 444 0022</td>
                                <td>3</td>
                                <td>12:30</td>
                                <td>17:30</td>
                            </tr>
                            <tr>
                                <td> &nbsp;</td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        </tbody>
                    </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckIn;