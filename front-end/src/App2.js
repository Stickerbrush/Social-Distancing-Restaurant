import React, { useEffect, useState } from 'react';
import './App.css';
import LoginHeader from "./components/LoginHeader";
import LoginInputBox from "./components/LoginInputBox";
import Login from "./components/Login";
import BarNav from "./components/BarNav";
import CustomerOptions from "./components/CustomerOptions"

export class App2 extends React.Component {

    state = {
        loginVisible: true,
        customerOptionVisible: true
    }

    openLogin = () => { this.setState({ loginComponentVisible: true }) }
    closeLogin = () => { this.setState({ loginComponentVisible: false }) }

    openCustomerOption = () => { this.setState({ loginComponentVisible: true }) }
    closeCustomerOption = () => { this.setState({ loginComponentVisible: false }) }

    render() {
        return (
            <div className="App">
                <BarNav />
                {this.state.loginVisible &&
                    <Login
                        clickCerrarLogin={this.closeLogin}
                        clickAbirCustomerOption={this.openCustomerOption} />
                }
                {this.state.customerOptionVisibl &&
                    <CustomerOptions
                        clickOpen={this.openLogin} />
                }
            </div>
        );
    }
}

export default App2;
