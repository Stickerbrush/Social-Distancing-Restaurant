const express = require('express')
const modeloCliente = require('./modeloCliente')
const modeloEmpleado = require('./modeloEmpleado')

let instance = null

class DBClass {
    static getInstance() {
     if(!instance) {
         instance = new DBClass()
     }
      return instance
   }

    constructor() {
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

    monitor() {
      this.app.listen(this.port, () => {
        console.log(`App running on port ${this.port}.`)
      })

      this.app.get('/clientes/:cedula/:contrasena', (req, res) => {
        modeloCliente.getCliente(req.params.cedula, req.params.contrasena)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })

      this.app.post('/clientes', (req, res) => {
        modeloCliente.createCliente(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })

      this.app.delete('/clientes/:telefono', (req, res) => {
        modeloCliente.deletehant(req.params.telefono)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })



      this.app.get('/empleados/:id/:contrasena', (req, res) => {
        modeloEmpleado.getEmpleado(req.params.id, req.params.contrasena)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })
    }
}

module.exports = DBClass
