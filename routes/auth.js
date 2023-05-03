const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken, obtenerUsuarios, updateUsuario, deleteUser, buscarPorId } = require('../controllers/authControllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//? Se importa y luego se tiene que crear una constante para poder ejecutarlo
const router = Router();

// Obtener todos
router.get('/usuarios', obtenerUsuarios)

//Crear un nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    validarCampos
] , crearUsuario );

// Buscar usuario
router.get(`/usuarios/:id`, validarJWT, buscarPorId)

// Actualizar usuario
router.put(`/usuarios/:id`,validarJWT, updateUsuario)

// Eliminar usuario
router.delete(`/usuarios/:id`, validarJWT, deleteUser)


//Login de usuario
router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    validarCampos

] , loginUsuario);


//Validar token
router.get('/renew', validarJWT, revalidarToken);


module.exports = router;
