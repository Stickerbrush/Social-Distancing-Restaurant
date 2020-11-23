const Pool = require('pg').Pool
var moment = require('moment');
var momentRange = require('moment-range');
momentRange.extendMoment(moment);

const pool = new Pool({
  connectionString: 'postgres://yprvbpsgfyfsls:cec675defcad44045415d6932ebc88d04d86080a3e3a4aa348be125256de3bcf@ec2-23-23-36-227.compute-1.amazonaws.com:5432/d3ok37s7f56j5j',
    ssl: {
        rejectUnauthorized: false
    }
});

function checkDateOverbooking(body, hora_termina){
  console.log("was here 3");

  return new Promise(function(resolve, reject) {
    const { fecha, hora, mesa, cliente_cedula} = body;
    pool.query('SELECT COUNT(*) FROM reservas WHERE (cliente_cedula = $1 and fecha = $2)', [cliente_cedula, fecha] , (error, results) => {
      if (error) {
        reject(error)
      }
      if(results !=null){
        if(results.rows[0].count >= 1){
          console.log(3)
          resolve(3);
        } else {
          console.log("eltres")
          console.log(0)
          resolve(0);
        }
      }
    })
  })
}

function trimHour(hora){
  var split_hour = hora.split(":");
  return split_hour[0] + ":" + split_hour[1];
}

function refineResponse(response){
  let refined_date = new Date(response.fecha);
  let refined_response = {
    id: response.id,
    fecha: refined_date.getDate() + "/" + (refined_date.getMonth()+1) + "/" + refined_date.getFullYear(),
    hora: trimHour(response.hora),
    mesa: response.mesa,
    cliente_cedula: response.cliente_cedula,
    hora_termina: trimHour(response.hora_termina)
  }
  console.log(refined_response);
  return refined_response;
}

function checkReservationOverlap(body, hora_termina){
  console.log("was here 2");

  return new Promise(function(resolve, reject) {
    const { fecha, hora, mesa, cliente_cedula} = body;
    pool.query('SELECT * FROM reservas WHERE (fecha = $1 and mesa = $2)', [fecha, mesa] , (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      }

      if(results !=null){
        if(results.rows.length > 0){
          var dummy_date = new Date(results.rows[0].fecha)
          var split_hour = hora.split(":")
          var year = dummy_date.getFullYear();
          var month = dummy_date.getMonth();
          var day = dummy_date.getDay();
          var hours1 = split_hour[0];
          var minutes1 = split_hour[1];
          var split_hour2 = hora_termina.split(":");
          var hours2 = split_hour2[0];
          var minutes2 = split_hour2[1];

          var range = moment.range(new Date(year, month, day, hours1, minutes1), new Date(year, month, day, hours2, minutes2));
          var errorFlag = false;
          for (let i = 0; i < results.rows.length; i++){
            split_hour = results.rows[i].hora.split(":");
            hours1 = split_hour[0];
            minutes1 = split_hour[1];
            split_hour2 = results.rows[i].hora_termina.split(":");
            var hours2 = split_hour2[0];
            var minutes2 = split_hour2[1];
            var range2 = moment.range(new Date(year, month, day, hours1, minutes1), new Date(year, month, day, hours2, minutes2));
            errorFlag = range.overlaps(range2)
            if (errorFlag){
              break;
            }
          }

          if(errorFlag){
            console.log(2)
            resolve(2)
          } else {
            checkDateOverbooking(body, hora_termina)
            .then(response => {
              console.log(response);
              resolve(response);
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
          }
        } else {
          checkDateOverbooking(body, hora_termina)
          .then(response => {
            console.log("eldos");
            console.log(response);
            resolve(response);
            return;
          })
          .catch(error => {
            console.log(error);
            reject(error)
          })
        }
      }
    })
  })
}

class ModeloReserva{

  createReserva (body){
    console.log(body);
    const { fecha, hora, mesa, cliente_cedula} = body;
    const hora_termina = this.calculateHoraTermina(hora);

    return this.chainOfResponsibilityValidation(body, hora_termina)
    .then(function(resolve, resolve2) {
      switch (resolve) {
        case 0: return pool.query('INSERT INTO reservas (fecha, hora, mesa, cliente_cedula, hora_termina) VALUES ($1, $2, $3, $4, $5) RETURNING *', [fecha, hora, mesa, cliente_cedula, hora_termina])
                          .then(response => {
                            let refined_response =  refineResponse(response.rows[0]);
                            return refined_response;
                          })
                          .catch(error => {
                            console.log(error);
                            reject(error)
                          })
          break;
         case 1:
              return 1;
          break;
          case 2:
              return 2;
          break;
          case 3:
              return 3;
          break;
      }
    })
  }

  deleteReserva(cliente_cedula, fecha, hora){
    hora = hora.replace(/-/g, ":");
    let  split_date = fecha.split("-")
    fecha = split_date[2] + "-" + split_date[1] + "-" + split_date[0];
    console.log(fecha)
    return new Promise(function(resolve, reject) {
      pool.query('DELETE FROM reservas WHERE (cliente_cedula = $1 and hora= $2 and fecha= $3)', [cliente_cedula, hora, fecha] ,(error, results) => {
        if (error) {
          reject(error)
        }
        resolve("0")
      })
    })

  }

  getReservasOfEmpleado(cedula){
    console.log("LOOOOL")
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM reservas WHERE (cliente_cedula = $1)', [cedula] ,(error, results) => {
        if (error) {
          reject(error)
        }
        if(results != null){
          let refined_result = []
          for(let i=0; i<results.rows.length; i++){
            let refined_response =  refineResponse(results.rows[i]);
            //refined_result.push(refined_response);
            results.rows[i] = refined_response;
          }
          resolve(results.rows);
        }
      })
    })
  }

  checkNumberOfReservationEntries(body, hora_termina){
    console.log("was here 1");

    return new Promise(function(resolve, reject) {
      const { fecha, hora, mesa, cliente_cedula} = body;
      pool.query('SELECT COUNT(*) FROM reservas WHERE cliente_cedula = $1', [cliente_cedula] , (error, results) => {
        if (error) {
          reject(error)
        }
        if(results !=null){
          if(results.rows[0].count >= 3){
            console.log(results.rows)
            console.log(1)
            resolve(1);
          } else {
            checkReservationOverlap(body, hora_termina)
            .then(response => {
              console.log("ELUNO")
              console.log(response)
              resolve(response);
              return;
            })
            .catch(error => {
              reject(error)
            })
          }
        }
      })
    })
  }

  calculateHoraTermina(hora){
    console.log("zdzdxd")
    var split_hour = hora.split(":");
    var time_res = new Date(2000, 1, 1, split_hour[0], split_hour[1], 0, 0);
    time_res.setTime(time_res.getTime() + (4*60*60*1000));
    time_res = time_res.getHours() + ":" + time_res.getMinutes()
    return time_res;
  }

  chainOfResponsibilityValidation(body, hora_termina){
    return this.checkNumberOfReservationEntries(body, hora_termina);
   }

}

module.exports = ModeloReserva;
