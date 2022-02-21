const express = require('express');
const controladorCurso = require('../controllers/curso.controller');

const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();


api.post('/agregarCurso',md_autenticacion.Auth, controladorCurso.agregarCurso);
api.post('/obtenerCursos',md_autenticacion.Auth, controladorCurso.obtenerCursos);
api.put('/editarCursos/:idCursos', md_autenticacion.Auth, controladorCurso.editarCursos);
api.delete('/EliminarCursos/:idCursos',controladorCurso.EliminarCursos);


module.exports = api;