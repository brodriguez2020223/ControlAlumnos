const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function RegistrarMaestro(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();


    Usuario.find({ email: parametros.email }, (err, usuarioEncontrados) => {
        if (usuarioEncontrados.length > 0) {
            return res.status(500)
                .send({ mensaje: "Este correo ya se encuentra utilizado" })
        } else {
            if (parametros.nombre && parametros.email
                && parametros.password) {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.email = parametros.email;
                modeloUsuario.password = parametros.password;
                modeloUsuario.rol = 'MAESTRO';

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    modeloUsuario.password = passwordEncriptada;

                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' })
                        if (!usuarioGuardado) return res.status(500)
                            .send({ mensaje: 'Error al guardar el Usuario' })

                        return res.status(200).send({ usuario: usuarioGuardado })
                    })
                })


            } else {
                return res.status(404)
                    .send({ mensaje: 'Debe ingresar los parametros obligatorios' })
            }

        }

    })
}

function RegistrarAlumno(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();

    if (parametros.nombre && parametros.email
        && parametros.password) {
        Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length > 0) {
                return res.status(500)
                    .send({ mensaje: "Este correo ya se encuentra utilizado" })
            } else {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.email = parametros.email;
                modeloUsuario.password = parametros.password;
                modeloUsuario.rol = 'ALUMNO';


                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    modeloUsuario.password = passwordEncriptada;

                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return re.status(500)
                            .send({ mensaje: 'Error en la peticion' })
                        if (!usuarioGuardado) return res.status(500)
                            .send({ mensaje: 'Error al guardad el usuario' })

                        return res.status(200).send({ usuario: usuarioGuardado })
                    })
                })
            }
        })

    } else {
        return res.status(404).send({ mensaje: 'Debe ingresar los parametros obligatorios' })
    }
}


function Login(req, res) {
    var parametros = req.body;

    // BUSCAMOS EL CORREO
    Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (usuarioEncontrado) {
            // COMPARAMOS CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password,
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({ token: jwt.crearToken(usuarioEncontrado) })
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contrasena no coincide.' })
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar' })
        }
    })
}

function editarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;

    // BORRAR LA PROPIEDAD DE PASSWORD EN EL BODY
    delete parametros.password

    if (req.user.sub !== idUser) {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Usuario.' });
    }

    Usuario.findByIdAndUpdate(req.user.sub, parametros, { new: true }, (err, usuarioEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
        if (!usuarioEditado) return res.status(500).send({ mensaje: 'Error al editar el Usuario' });

        return res.status(200).send({ usuario: usuarioEditado });
    })
}

function EliminarUsuario(req, res) {
    var idUsu = req.params.idUsuario;

    if (req.user.sub !== idUsu) {
        return res.status(500).send({ mensaje: 'No tiene los permisos para Eliminar este usuario' })
    } else {

        Usuario.findByIdAndDelete(idUsu, (err, usuarioEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!usuarioEliminado) return res.status(500)
                .send({ mensaje: 'Error al eliminar el Usuario' })

            return res.status(200).send({ usuario: usuarioEliminado });
        })
    }
}



// BUSQUEDAS


function BusquedaNombre(req, res) {
    var nomUser = req.params.nombreUsuario;

    Usuario.find({ nombre: nomUser }, (err, usuariosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuariosEncontrados) return res.status(500)
            .send({ mensaje: 'Error al obetener usuarios' })

        return res.status(200).send({ usuario: usuariosEncontrados })
    })
}

module.exports = {
    RegistrarMaestro,
    RegistrarAlumno,
    Login,
    editarUsuario,
    EliminarUsuario,
    BusquedaNombre
}