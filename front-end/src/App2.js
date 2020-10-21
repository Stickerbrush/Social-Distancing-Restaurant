import React from 'react';
import './App.css';
import Login from "./components/Login";
import BarNav from "./components/BarNav";
import CustomerOptions from "./components/CustomerOptions"

export class App2 extends React.Component {

    state = {
        loginVisible: true,
        customerOptionVisible: false
    }

    openLogin = () => {
        this.setState({ loginVisible: true });
        this.closeCustomerOption()

    }
    closeLogin = () => {
        this.setState({ loginVisible: false })
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
                <BarNav />
                {this.state.loginVisible &&
                    <Login clickCerrarLogin={this.closeLogin}/>
                }
                {this.state.customerOptionVisible &&
                    <CustomerOptions clickOpen={this.openLogin} />
                }
            </div>
        );
    }
}

export default App2;
