import React, { Component } from "react";
import { useState, useEffect } from "react";
import "./LoginStyle.css";

export default class LoginHeader extends Component {

    render() {


        return(
        <div className="container
                                border border-dark rounded">
            <div className="row">

                <div className="col
                                        text-center">
                    <h3>Column 2</h3>
                    <p>Lorem ipsum dolor...</p>
                </div>
                <div className="col
                                        text-center">
                    <h3>Column 3</h3>
                    <p>Lorem ipsum dolor..</p>
                </div>
            </div>


        </div>
        );
    }
}