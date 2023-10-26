const mongoose = require('mongoose')
//* Exportacion del Modelo (Usuarios)
const Usuarios = mongoose.model('Usuarios')

exports.formCrearCuenta = ( req, res ) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en DevJobs',
        tagline: 'Comienza a publicar tus vacantes, Gratis'
    })
}

exports.crearUsuario = async ( req, res, next ) => {
    // * Creación del usuario
    const usuario = new Usuarios(req.body)
    const nuevoUsuario = await usuario.save();

    if(!nuevoUsuario) return next()

    res.redirect('/iniciar-sesion')

}   