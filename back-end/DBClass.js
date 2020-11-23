const express = require('express')
const ControllerFactory = require('./ControllerFactory')

let instance = null

class DBClass {
    static getInstance() {
     if(!instance) {
         instance = new DBClass();
     }
      return instance
   }

    constructor() {
     this.app = express()
     this.port = process.env.PORT || 5000
     this.modeloCliente = ControllerFactory.createController("Cliente");
     this.modeloEmpleado = ControllerFactory.createController("Empleado");
     this.modeloReserva = ControllerFactory.createController("Reserva");
    }

    connect() {
      this.app.use(express.json())
      this.app.use(function (req, res, next) {
        //res.setHeader('Access-Control-Allow-Origin', 'https://social-distancing-restaurant.herokuapp.com');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
        next();
      });
    }

    monitor() {
      this.app.listen(this.port, () => {
        console.log(`App running on port ${this.port}.`)
      })

      /*----------------------CLIENTES------------------------  */
      this.app.get('/clientes/:cedula/:contrasena', (req, res) => {
        this.modeloCliente.getCliente(req.params.cedula, req.params.contrasena)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })

      this.app.post('/clientes', (req, res) => {
        this.modeloCliente.createCliente(req.body)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })

      this.app.delete('/clientes/:telefono', (req, res) => {
        this.modeloCliente.deletehant(req.params.telefono)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })

      /*----------------------EMPLEADOS------------------------  */
      this.app.get('/empleados/:id/:contrasena', (req, res) => {
        this.modeloEmpleado.getEmpleado(req.params.id, req.params.contrasena)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })

      /*----------------------RESERVAS------------------------  */
      this.app.post('/reservas', (req, res) => {
        this.modeloReserva.createReserva(req.body)
        .then(response=> {

          if(response === 1){
            res.status(500).send("No se pueden tener más de trés reservas simultaneas");
          } else if (response === 2){
            res.status(500).send("Esta mesa ya se encuentra agendada durante el horario escogido");
          } else if (response === 3){
            res.status(500).send("Solo puede tener una reservación por día");
          } else {
            console.log("reposaito");
            console.log(response);
            res.status(200).send(response);
          }
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })

      this.app.get('/reservasPorCliente/:cedula', (req, res) => {
        this.modeloReserva.getReservasOfEmpleado(req.params.cedula)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(error => {
          res.status(500).send(error);
        })
      })

      this.app.delete('/reservasBorrar/:cedula_cliente/:fecha/:hora', (req, res) => {
        console.log("REALGS")
        this.modeloReserva.deleteReserva(req.params.cedula_cliente,
                                         req.params.fecha,
                                         req.params.hora)
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
