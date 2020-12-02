import React, { Component } from "react";
import "./styles/LoginStyle.css";
export default class LoginHeader extends Component {
    state = {
        count: 0
    };


    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid
                                 text-center
                                 border-bottom border-dark rounded">

                    <h1>Cafeteria New Wave</h1>
                </div>
            </div>
        );
    }
}

