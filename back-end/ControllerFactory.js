const ModeloEmpleado = require('./modeloEmpleado');
const ModeloCliente = require('./modeloCliente');
const ModeloReserva = require('./ModeloReserva');
const connectionString = 'postgres://yprvbpsgfyfsls:cec675defcad44045415d6932ebc88d04d86080a3e3a4aa348be125256de3bcf@ec2-23-23-36-227.compute-1.amazonaws.com:5432/d3ok37s7f56j5j';

class ControllerFactory {
    static createController(controller_name){
      switch(controller_name){
        case 'Cliente':
          return new ModeloCliente(connectionString);
          break;
        case 'Empleado':
          return new ModeloEmpleado(connectionString);
          break;
        case 'Reserva':
          return new ModeloReserva(connectionString);
          break;
      }
    }
}

module.exports = ControllerFactory;
