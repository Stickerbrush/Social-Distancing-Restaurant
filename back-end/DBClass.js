const express = require('express')
const modeloCliente = require('./modeloCliente')
const modeloEmpleado = require('./modeloEmpleado')

class DBClass {

    constructor(props) {
     this.app = express()
     this.port = process.env.PORT || 5000

    }

    connect() {
      this.app.use(express.json())
      this.app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'https://social-distancing-restaurant.herokuapp.com');
        //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
        next();
      });
    }

    get conn() {
     return this._conn
    }

    static getInstance() {
     if(!instance) {
         instance = new DBClass()
     }

     return instance
    }
}

module.exports = DBClass
