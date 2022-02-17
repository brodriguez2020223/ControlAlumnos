const express = require('express');
const controladorCurso = require('../controllers/curso.controller');

const api = express.Router();


api.post('/agregarCursos',md_autenticacion.Auth, controladorCurso.agregarCursos);
api.post('/obtenerCursos',md_autenticacion.Auth, controladorCurso.obtenerCursos);
api.put('/editarCursos/:idCursos', md_autenticacion.Auth, controladorCurso.editarCursos);
api.delete('/EliminarCursos/:idCursos',controladorCurso.EliminarCursos);


module.exports = api;