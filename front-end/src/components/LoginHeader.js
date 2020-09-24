import React, { Component } from "react";
import "./LoginStyle.css";
import Login from "./Login";

export default class LoginHeader extends Component{
    state = {
        count: 0
    };


    render(){
        return (
            /*<React.Fragment>
                <p> {'7'  + '7' + '7'}</p>
            </React.Fragment>*/
        <div>
                <div  className="jumbotron jumbotron-fluid
                                 text-center
                                 border-bottom border-dark rounded">

                    <h1>Cafeteria New Wave</h1>
                </div>
                <Login></Login>
        </div>
        );
    }
}

