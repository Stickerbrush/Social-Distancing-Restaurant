import React from 'react';
import './App.css';
import Login from "./components/Login";
import BarNav from "./components/BarNav";
import CustomerOptions from "./components/CustomerOptions";
import SingUp from "./components/SingUp";

export class App2 extends React.Component {

    state = {
        loginVisible: true,
        singUpVisible : false,
        customerOptionVisible: false
    }

    openLogin = () => {
        this.setState({ loginVisible: true });
        this.closeCustomerOption()
        this.closeSingUp();
    }
    
    closeLogin = () => {
        this.setState({ loginVisible: false })
        this.openCustomerOption()
    }

    openSingUp = () => {
        this.setState({ singUpVisible: true });
        this.closeCustomerOption()
        this.closeLogin();

    }
    closeSingUp = () => {
        this.setState({ singUpVisible: false })
        this.openCustomerOption()
    }

    openCustomerOption = () => {
        this.setState({ customerOptionVisible: true })
    }

    closeCustomerOption = () => {
        this.setState({ customerOptionVisible: false })
    }

    render() {
        return (
            <div className="App">
                <BarNav clickAbrirLogin={this.openLogin} clickAbrirSingUp={this.openSingUp}/>
                {this.state.loginVisible &&
                    <Login clickCerrarLogin={this.closeLogin}/>
                }
                {this.state.singUpVisible &&
                    <SingUp clickCerrarSingUp={this.closeSingUp}/>
                }
                {this.state.customerOptionVisible &&
                    <CustomerOptions clickOpen={this.openLogin} />
                }
            </div>
        );
    }
}

export default App2;
