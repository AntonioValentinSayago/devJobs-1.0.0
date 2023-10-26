const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');

module.exports = () => {
    router.get('/', homeController.mostrarTrabajos)

    // * ruta para crear los vacantaes
    router.get('/vacantes/nueva', vacantesController.formularioNuevaVacante)
    router.post('/vacantes/nueva', vacantesController.agregarVacante)

    // * Mostrar Vacante (Singular)

    router.get('/vacantes/:url', vacantesController.mostrarVacante )

    return router;
}