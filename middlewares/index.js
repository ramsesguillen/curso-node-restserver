



const validarCampos = require('./validar-campos');
const validarRoles  = require('./validar-roles');
const validarJWT = require('./validar-jwt');
const validarObjectId = require('./validar-objectId');
const validarcategoriaUsuario = require('./validar-categoriaUsuario');

module.exports = {
    ...validarCampos,
    ...validarRoles,
    ...validarJWT,
    ...validarObjectId,
    ...validarcategoriaUsuario
}

