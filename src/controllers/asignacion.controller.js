const Asignacion = require('../models/asignacion.model');

function agregarAsignacion(req, res) {
    var parametros = req.body;
    var modeloAsignacion = new Asignacion();

    if (req.user.rol == "Maestro") {

        modeloAsignacion.idMaestro = req.user.sub;
        modeloAsignacion.idCurso = req.params.idCurso;

        modeloAsignacion.save((err, asignacionGuardado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!asignacionGuardado) return res.status(500).send({ mensaje: 'Error al agregar la Asignacion' })

            return res.status(200).send({ asignacion: asignacionGuardado });
        })

    } else {
        return res.status(500).send({ mensaje: 'Debe ingresar los parametros obligatorios' });
    }
}

function editarAsignacion(req, res) {
    var idAsign = req.params.idAsignacion;
    var parametros = req.body;

    if (req.user.rol !== 'MAESTRO') {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Asignacion.' });
    }

    Asignacion.findByIdAndUpdate(idAsign, parametros, { new: true }, (err, asignacionEditada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
        if (!asignacionEditada) return res.status(500).send({ mensaje: 'Error al editar el Usuario' });

        return res.status(200).send({ asignacion: asignacionEditada });
    })
}

function EliminarAsignacion(req, res) {
    var idAsing = req.params.idAsignacion;

    Curso.findByIdAndDelete(idAsing, (err, asignacionEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!asignacionEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el asignacion' })

        return res.status(200).send({ asignacion: asignacionEliminado });
    })
}



function obtenerAsignacion(req, res) {
    Asignacion.find({}, (err, asignacionEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la Peticion' });
        if (!asignacionEncontrado) return res.status(500).send({ mensaje: 'Error al obtener las Asignaciones' });

        return res.status(200).send({ asignacion: asignacionEncontrado })
    }).populate('idMaestro', 'idCurso')
}



module.exports = {
    agregarAsignacion,
    obtenerAsignacion,
    editarAsignacion,
    EliminarAsignacion
}