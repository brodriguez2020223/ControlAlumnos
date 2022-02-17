const express = require('express');
const controladorAsignacion = require('../controllers/asignacion.controller');

const api = express.Router();


api.post('/agregarAsignacion',md_autenticacion.Auth, controladorAsignacion.agregarAsignacion);
api.post('/obtenerAsignacion',md_autenticacion.Auth, controladorAsignacion.obtenerAsignacion);
api.put('/editarAsignacion/:idAsignacion', md_autenticacion.Auth, controladorAsignacion.editarAsignacion);
api.delete('/EliminarAsignacion/:idAsignacion', controladorAsignacion.EliminarAsignacion);


module.exports = api;