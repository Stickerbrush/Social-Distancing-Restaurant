import React, { Component } from "react";
import "./login.css";

export default class Login extends Component{
    state = {
        count: 0
    };


    render(){
        return (
            /*<React.Fragment>
                <p> XDDDDDD {'7'  + '7' + '7'}</p>
            </React.Fragment>*/
        <div>
                <div  className="jumbotron jumbotron-fluid
                                 text-center
                                 border-bottom border-dark rounded">

                    <h1>Cafeteria New Wave</h1>
                </div>


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

        </div>
        );
    }
}

