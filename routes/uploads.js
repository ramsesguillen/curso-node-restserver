//* IMPORTS
const express = require('express');
const { check } = require('express-validator');


const {
    cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenClaudinady
} = require('../controllers/uploads');

const {
    validarCampos,
    validarArchivoSubir
} = require('../middlewares');

const {
    coleccionesPermitidas
} = require('../helpers');

const router = express.Router();




//* ROUTES
router.post('/', validarArchivoSubir, cargarArchivo );

// router.put('/:coleccion/:id', [
//     validarArchivoSubir,
//     check('id', 'El id debe ser de mongo').isMongoId(),
//     check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'] ) ),
//     validarCampos
// ], actualizarImagen);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagenClaudinady);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen)


module.exports = router;

