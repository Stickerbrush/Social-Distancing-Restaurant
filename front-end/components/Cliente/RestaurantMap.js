import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import "./styles/RestaurantMap.css";
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {Redirect} from "react-router-dom";
import io from "socket.io-client";
let socket;


export class RestaurantMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            to_book_hour: '',
            to_book_date: '',
            mesa_checkin: '',
            highlighted_row: '',
            client_latitude: '',
            client_longitude: '',
            restaurant_latitude: 53.558194,
            restaurant_longitude: 9.948864,
            client_positions: [],
            redirect: false
        };

        this.renderClientMarkers = this.renderClientMarkers.bind(this);
    }

    componentDidMount() {
        socket = io.connect(global.map_addr);

        socket.on('pos', (positions) =>{
            this.setState({
                client_positions: positions
            })
          //  console.log(positions);
        })

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

    }

    componentWillUpdate(){
        this.getGeoLocation()
        let position = {client_latitude: this.state.client_latitude,
                         client_longitude: this.state.client_longitude};
        let cedulaCliente = this.props.cedulaCliente;
        socket.emit('sendPosition', {cedulaCliente, position});
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

    renderClientMarkers(){

        console.log(this.state.client_positions);
        if(this.state.client_positions.length > 0){
            let clientPosArray = [...this.state.client_positions];
            return clientPosArray.map((client, index) => {

                const { client_latitude, client_longitude } = client //destructuring
                console.log(client);
                console.log(client_latitude + " " + client_longitude)

               if(client_latitude !== this.state.client_latitude &&
                   client_longitude !== this.state.client_positions){
                   return (
                       <Marker key = {index} position={[client_latitude, client_longitude]} src = "../../img/marker-icon-2.png">

                       </Marker>
                   )
               } else {
                   return(
                       <Marker position={[this.state.client_latitude, this.state.client_longitude]} src = "../img/marker-icon-2.png">
                           <Popup>
                               Su posicion en el restaurante!
                           </Popup>
                       </Marker>
                   );
               }


            })
        }
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
                               Mapa del restaurante
                            </Form.Text>
                        </Form.Group>
                        {/*[53.575, 10.0342]*/}
                        <MapContainer center={[this.state.restaurant_latitude, this.state.restaurant_longitude]} zoom={20}
                                      scrollWheelZoom={false}
                                      style={{height : '600px', width: '1000px'}}

                        >
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />



                            {this.renderClientMarkers()}



                        </MapContainer>


                    </Form>
                    <br></br>
                    <div className="table-container">

                    </div>
                </div>
            </div>
        );
    }
}

export default RestaurantMap;