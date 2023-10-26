const mongoose = require('mongoose')
//* Exportacion del Modelo (Vacante)
const Vacante = mongoose.model('Vacante')

exports.formularioNuevaVacante = ( req, res ) => {
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    })
}

// ? Agregar vacantes a la base de datos
exports.agregarVacante = async ( req, res ) => {
    const vacante = new Vacante(req.body)

    // * Crear el Array para las habiliades
    vacante.skills = req.body.skills.split(',')

    // ? Almacenar los datos en la base de datos

    const nuevaVacante = await vacante.save();

    res.redirect(`/vacantes/%{nuevaVacante.url}`);

}

// ? Muestra una Vacante

exports.mostrarVacante = async ( req, res, next ) => {
    const vacante = await Vacante.findOne({url: req.params.url}).lean()

    // ? Si no existe el resultado
    if(!vacante) return next()

    // ? Si existe un resultado -> Mostramos la vista
    res.render('vacante' , {
        vacante,
        nombrePagina: vacante.titulo,
        barra: true
    })
}
