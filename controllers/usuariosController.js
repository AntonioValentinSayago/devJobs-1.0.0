const mongoose = require('mongoose')
// ? Exportacion del Modelo (Usuarios)
const Usuarios = mongoose.model('Usuarios')

// Exportacion de express-validator
const { body,validationResult,check  } = require('express-validator');

exports.formCrearCuenta = ( req, res ) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en DevJobs',
        tagline: 'Comienza a publicar tus vacantes, Gratis'
    })
}

exports.validarRegistro = async( req, res, next ) => {

    await body('nombre').notEmpty().withMessage('El nombre es Obligatorio').run(req);
    await body('email').isEmail().withMessage('El email debe ser Valido').run(req);
    await body('password').notEmpty().withMessage('El password no debe ir Vacio').run(req);
    await body('confirmar').notEmpty().withMessage('El Confirmar password no debe ir Vacio').run(req);
    await body('confirmar').equals(req.body.password).withMessage('El password es Diferente').run(req);
    
    const errores = validationResult(req);
    
    if (!errores.isEmpty()) {
        // Si hay errores
        req.flash('error', errores.array().map(error => error.msg));
    
        return res.render('crear-cuenta', {
            nombrePagina: 'Crea tu cuenta en DevJobs',
            tagline: 'Comienza a publicar tus vacantes, Gratis',
            mensajes: req.flash(),
        });
    }
    
    // Si toda la validación es correcta
    next();
}


exports.crearUsuario = async ( req, res, next ) => {
    // * Creación del usuario
    const usuario = new Usuarios(req.body)

    try {
        await usuario.save();
        res.redirect('/iniciar-sesion')
    } catch (error) {
        req.flash('error', error)
        res.redirect('/crear-cuenta')
    }

}   

// ? Formulario para inicia Sesion
exports.formIniciarSesion = ( req, res ) => {
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesión devJobs'
    })
}

