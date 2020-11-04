const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const modeloCliente = require('./modeloCliente')
const modeloEmpleado = require('./modeloEmpleado')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://social-distancing-restaurant.herokuapp.com');
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/clientes/:cedula/:contrasena', (req, res) => {
  modeloCliente.getCliente(req.params.cedula, req.params.contrasena)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/clientes', (req, res) => {
  modeloCliente.createCliente(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/clientes/:telefono', (req, res) => {
  modeloCliente.deletehant(req.params.telefono)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/empleados/:id/:contrasena', (req, res) => {
  modeloEmpleado.getEmpleado(req.params.id, req.params.contrasena)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
