const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS

const usuarioRoutes = require('./src/routes/usuario.routes');


/*const productosRoutes = require('./src/routes/productos.routes');
const ejemplosRoutes = require('./src/routes/ejemplos.routes');
const encuestasRoutes = require('./src/routes/encuestas.routes');
*/

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());


// CARGA DE RUTAS localhost:3000/api/productos
app.use('/api', usuarioRoutes/*, productosRoutes, ejemplosRoutes, encuestasRoutes*/);

module.exports = app;