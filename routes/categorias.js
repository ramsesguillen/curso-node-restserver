//* IMPORTS
const express = require('express');
const { check } = require('express-validator');
const {
    actuliazarCategoria ,
    borrarCategoria,
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias
} = require('../controllers/categorias');

const {
    validarJWT,
    validarCampos,
    validarObjectId,
    tieneRole
} = require('../middlewares');

const {
    existeCategoria,
    existeCategoriaNombre
} = require('../helpers/db-validators');

const router = express.Router();




//* ROUTES
// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id', [
    validarJWT,
    // validarId calido
    validarObjectId,
    // validar que el id existe
    check('id').custom((id) => existeCategoria(id)),
    validarCampos
], obtenerCategoria);

// Crear categoria - privado - cualquier token valido
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaNombre),
    validarCampos
], crearCategoria );

// Actualizar categoria - privado - cualquier token valido
router.put('/:id', [
    validarJWT,
    validarObjectId,
    check('id').custom( existeCategoria ),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    // validar que el id existe
    // validarId calido
    validarCampos
], actuliazarCategoria);

// Borrar categoria - Admin
router.delete('/:id', [
    validarJWT,
    validarObjectId,
    tieneRole('ADMIN_ROLE'),
    check('id').custom( existeCategoria ),
    // validar que el id existe
    // validarId calido
    validarCampos
], borrarCategoria);





module.exports = router;