const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: 'postgres://yprvbpsgfyfsls:cec675defcad44045415d6932ebc88d04d86080a3e3a4aa348be125256de3bcf@ec2-23-23-36-227.compute-1.amazonaws.com:5432/d3ok37s7f56j5j',
    ssl: {
        rejectUnauthorized: false
    }
});


const getCliente = (cedula, contrasena) => {
  console.log('SELECT * FROM clientes WHERE (cedula = $1 and password = $2)', [cedula, contrasena]);
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM clientes WHERE (cedula = $1 and password =  $2)', [cedula, contrasena] ,(error, results) => {
      if (error) {
        reject(error)
      }
      if(results != null){
        resolve(results.rows);
      }

    })
  })
}

const createCliente = (body) => {
  return new Promise(function(resolve, reject) {
    const { telefono, nombre } = body
    pool.query('INSERT INTO clientes (telefono, nombre) VALUES ($1, $2) RETURNING *', [telefono, nombre], (error, results) => {
      if (error) {
        reject(error)
      }
      if(results !=null){
      resolve(`A new merchant has been added added: ${results.rows[0]}`)
      }
    })
  })
}
const deleteCliente = () => {
  return new Promise(function(resolve, reject) {
    const telefono = request.params.telefono
    pool.query('DELETE FROM clientes WHERE telefono = $1', [telefono], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Merchant deleted with ID: ${telefono}`)
    })
  })
}

module.exports = {
  getCliente,
  createCliente,
  deleteCliente,
}
