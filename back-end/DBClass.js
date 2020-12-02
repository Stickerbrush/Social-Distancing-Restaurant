const express = require('express')
const ControllerFactory = require('./ControllerFactory')
const http = require('http');

const chat_app = express();
const chat_server = http.createServer(chat_app);
const io = require("socket.io")(chat_server, {
  cors: {
    origin: '*',
  }
});

/* CHAT SOCKET */

const chat_port = 5001
chat_server.listen(chat_port, () => console.log(`Chat server started on port ${chat_port}`))

io.on('connection', (socket) => {
  console.log('User connected to chat');

  socket.on('disconnect', () => {
    console.log("user left");
  })

  socket.on('join', ({nombreCliente, clienteMesa}) => {
    let nombre = nombreCliente;
    let room = clienteMesa;
      socket.join(room)
      console.log(`User has joined room mesa ${room}`)
  })
  socket.emit('message', "Boca sho te amo")

  socket.on('sendMessage', (message) => {
    console.log(message)
    socket.emit('message', "Boca sho te amo")
  })
})

/* MAP SOCKET */
const map_app = express();
const map_server = http.createServer(map_app);
const io2 = require("socket.io")(map_server, {
  cors: {
    origin: '*',
  }
});

let positions = {};
const map_port = 5002
map_server.listen(map_port, () => console.log(`Map server started on port ${map_port}`))

io2.on('connection', (socket) => {
  console.log('User entered the restaurant');

  socket.on('disconnect', () => {
    console.log("User has left the restaurant");
  })


  socket.on('sendPosition', (payload) => {
    cedulaCliente = payload.cedulaCliente;
    position = payload.position;
    positions[cedulaCliente] = position;
    socket.emit('pos', Object.values(positions))
  })
})


let instance = null

class DBClass {
    static getInstance() {
     if(!instance) {
         instance = new DBClass();
     }
      return instance
   }

    constructor() {
     this.app = express();
     //this.chat_server = http.createServer(this.app);
    // this.io = socketio(this.chat_server);
     this.port =  5000
     this.modeloCliente = ControllerFactory.createController("Cliente");
     this.modeloEmpleado = ControllerFactory.createController("Empleado");
     this.modeloReserva = ControllerFactory.createController("Reserva");
     this.modeloPlato = ControllerFactory.createController("Plato");
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
      /*#######################CHAT MONITORING##############################*/




      /*#######################DB SERVER MONITORING##############################*/

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

      /*----------------------PLATOS------------------------  */

      this.app.get('/platos', (req, res) => {
        this.modeloPlato.getPlatos()
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
