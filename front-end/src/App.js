import React, { useEffect, useState } from 'react';
import './App.css';
import LoginHeader from "./components/LoginHeader";
import LoginInputBox from "./components/LoginInputBox";
import Login from "./components/Login";
import BarNav from "./components/BarNav";


function App() {

    const [clientes, setClientes] = useState(false);
    useEffect(() => {
        getCliente();
    }, []);

    function getCliente() {
        fetch('https://s-d-r-backend.herokuapp.com')
            //fetch('http://localhost:5000')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setClientes(data);
            });
    }


    function createCliente() {
        let telefono = prompt('Enter client phone number');
        let nombre = prompt('Enter client name');
        fetch('https://s-d-r-backend.herokuapp.com/clientes', {
            //fetch('http://localhost:5000/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ telefono, nombre }),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getCliente();
            });
    }

    function deleteCliente() {
        let telefono = prompt('Enter client phone number');
        fetch(`https://s-d-r-backend.herokuapp.com/telefono/${telefono}`, {
            //fetch('http://localhost:5000/clientes/${telefono}', {
            method: 'DELETE',
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getCliente();
            });
    }

    return (
        <div className="App">
            <BarNav />
            <Login/>
            <LoginInputBox />

            {clientes ? clientes : 'There is no client data available'}
            <br />
            <button onClick={createCliente}>Add merchant</button>
            <br />
            <button onClick={deleteCliente}>Delete merchant</button>
        </div>
    );
}

export default App;
