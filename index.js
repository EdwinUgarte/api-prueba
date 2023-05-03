
//?Primero se importa express a una constante
const express = require("express");
const cors = require("cors")
const { dbConnection } = require("./DB/config");
require('dotenv').config();





//!AQUI SE CREA SERVIDOR EXPRESS
const app = express();

//!Base de datos
dbConnection();

//Lectura y parseo del body
app.use( express.json() );

//CORS se define los sitios que pueden acceder al backend
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT"]
}));


// Rutas
app.use('/api', require('./routes/auth'));

//! Se especifica en que puerto se va a correr el servidor express
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en port: ${process.env.PORT}`);
});

// Directorio publico para que si entran a / mande el html
app.use( express.static('public'))


