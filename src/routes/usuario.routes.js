const express = require('express');
const controladorUsuario = require('../controllers/usuario.controller');


const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();


api.post('/registrarAlumno', controladorUsuario.RegistrarAlumno);
api.post('/registrarMaestro', controladorUsuario.RegistrarMaestro);
api.post('/Login', controladorUsuario.Login);
api.get('/buscarNombre/: nombreUsuario', controladorUsuario.BusquedaNombre);
api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth, controladorUsuario.editarUsuario);
api.delete('/EliminarUsuario/:idUsuario', controladorUsuario.EliminarUsuario);

module.exports = api;