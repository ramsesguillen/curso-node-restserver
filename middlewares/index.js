



const validarCampos = require('./validar-campos');
const validarRoles  = require('./validar-roles');
const validarJWT = require('./validar-jwt');

module.exports = {
    ...validarCampos,
    ...validarRoles,
    ...validarJWT
}

