const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: 'postgres://yprvbpsgfyfsls:cec675defcad44045415d6932ebc88d04d86080a3e3a4aa348be125256de3bcf@ec2-23-23-36-227.compute-1.amazonaws.com:5432/d3ok37s7f56j5j',
    ssl: {
        rejectUnauthorized: false
    }
});


const getEmpleado = (id, contrasena) => {
  console.log('SELECT * FROM empleados WHERE (id = $1 and password = $2)', [id, contrasena]);
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM empleados WHERE (id = $1 and password = $2)', [id, contrasena] ,(error, results) => {
      if (error) {
        reject(error)
      }
      if(results != null){
        resolve(results.rows);
      }

    })
  })
}

module.exports = {
  getEmpleado,
}
