//* IMPORTS
const express = require('express');
const { check } = require('express-validator');
const {
    actuliazarProducto,
    borrarProducto,
    crearProducto,
    obtenerProductos,
    obtenerProducto
} = require('../controllers/productos');

const {
    validarJWT,
    validarCampos,
    validarObjectId,
    tieneRole,
    validarcategoriaUsuario
} = require('../middlewares');

const {
    existeCategoria,
    existeProductoNombre,
    existeProductoId
} = require('../helpers/db-validators');

const router = express.Router();




//* ROUTES
// Obtener todas las categorias - publico
router.get('/', obtenerProductos );

// Obtener una categoria por id - publico
router.get('/:id', [
    validarJWT,
    // validarId calido
    validarObjectId,
    // validar que el id existe
    check('id').custom(existeProductoId),
    validarCampos
], obtenerProducto);


// Crear  - privado - cualquier token valido
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    // validar que el no exista con mismo nombre
    check('nombre').custom( existeProductoNombre ),
    check('categoria', 'Categoria no valida').isMongoId(),
    validarCampos,
    check('categoria', 'La categoria es obligatorio').not().isEmpty(),
    // validar que la categoria existe
    check('categoria').custom(existeCategoria),
    validarCampos,
    // validar que la categoria es del usuario
    validarcategoriaUsuario,
    validarCampos
], crearProducto );

// Actualizar categoria - privado - cualquier token valido
router.put('/:id', [
    validarJWT,
    validarObjectId,
    check('id').custom(existeProductoId),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre').custom( existeProductoNombre ),
    check('categoria').custom(existeCategoria),
    validarCampos
], actuliazarProducto);

// Borrar categoria - Admin
router.delete('/:id', [
    validarJWT,
    validarObjectId,
    tieneRole('ADMIN_ROLE'),
    check('id').custom( existeProductoId ),
    validarCampos
], borrarProducto);





module.exports = router;







