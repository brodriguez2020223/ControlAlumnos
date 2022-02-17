const Curso = require('../models/curso.model');


function agregarCursos(req, res) {
    var parametros = req.body;
    var modeloCurso = new Curso();

    if (req.user.rol == "MAESTRO") {
        modeloCurso.pregunta = parametros.nombre;
        modeloCurso.nombre = parametros.nombre;
        modeloCurso.idMaestro = req.user.sub;

        modeloCurso.save((err, cursoGuardado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!cursoGuardado) return res.status(500).send({ mensaje: 'Error al agregar la Curso' })

            return res.status(200).send({ curso: cursoGuardado });
        })

    } else {
        return res.status(500).send({ mensaje: 'Debe ingresar los parametros obligatorios' });
    }
}


function editarCursos(req, res) {
    var idCur = req.params.idCursos;
    var parametros = req.body;

    if (req.user.rol !== 'MAESTRO') {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este curso.' });
    }
    Curso.findByIdAndUpdate(idCur, parametros, { new: true }, (err, cursoEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
        if (!cursoEditado) return res.status(500).send({ mensaje: 'Error al editar el curso' });

        return res.status(200).send({ curso: cursoEditado });
    })
}

function EliminarCursos(req, res) {
    var idCur = req.params.idCursos;

    if (req.user.sub !== idCur) {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este curso' })
    } else {
        Curso.findByIdAndDelete(idCur, (err, cursoEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!cursoEliminado) return res.status(500)
                .send({ mensaje: 'Error al eliminar el curso' })

            return res.status(200).send({ curso: cursoEliminado });
        })
    }
}

function obtenerCursos(req, res) {
    Curso.find({}, (err, cursoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la Peticion' });
        if (!cursoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener las cursos' });

        return res.status(200).send({ cursos: cursoEncontrado })
    }).populate('idMaestro', 'nombre')
}


module.exports = {
    agregarCursos,
    obtenerCursos,
    editarCursos,
    EliminarCursos
}