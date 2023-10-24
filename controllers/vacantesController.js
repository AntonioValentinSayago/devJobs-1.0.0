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