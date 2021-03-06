const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS

const usuarioRoutes = require('./src/routes/usuario.routes');
const cursoRoutes = require('./src/routes/curso.routes');

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());


// CARGA DE RUTAS localhost:3000/api/productos
app.use('/api', usuarioRoutes, cursoRoutes, /* ejemplosRoutes, encuestasRoutes*/);

module.exports = app;