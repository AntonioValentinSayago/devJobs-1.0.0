const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');

module.exports = () => {
    router.get('/', homeController.mostrarTrabajos)

    // * ruta para crear los vacantaes
    router.get('/vacantes/nueva', vacantesController.formularioNuevaVacante)
    router.post('/vacantes/nueva', vacantesController.agregarVacante)

    // * Mostrar Vacante (Singular)

    router.get('/vacantes/:url', vacantesController.mostrarVacante )

    // * Editar la Vacante
    router.get('/vacantes/editar/:url', vacantesController.formEditarVacante)
    router.post('/vacantes/editar/:url', vacantesController.editarVacante)

    // * Ruta para el formulario de (Crear Cuenta)
    router.get('/crear-cuenta', usuariosController.formCrearCuenta)
    router.post('/crear-cuenta', usuariosController.crearUsuario)

    return router;
}