const { response } = require('express');
const Router = require('express');
const { check } = require('express-validator');
const { obtenerEquipos, crearEquipo, updateEquipo, deleteEquipo, buscarEquipo } = require('../controllers/equipoControllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/equipos',validarJWT, obtenerEquipos);

router.get('/equipos/:id', buscarEquipo);

router.post('/equipos/new', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('pais', 'El pais es obligatorio').notEmpty()
],validarCampos, crearEquipo);

router.put('/equipos/:id', updateEquipo);

router.delete('/equipos/:id', deleteEquipo);


module.exports = router;