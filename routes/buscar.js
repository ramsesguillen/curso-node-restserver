
//* IMPORTS
const express = require('express');
const { check } = require('express-validator');

const { buscar } = require('../controllers/buscar');

const router = express.Router();


router.get('/:coleccion/:termino', buscar);




module.exports = router;