const mongoose = require('mongoose');
const Role = require('../models/rol');
const Usuario = require('../models/usuario');




const esRoleValido =  async( rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol( ${rol} ) no está registrado en la DB`);
    }
}


const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ) {
        throw new Error(`El correo(${correo}) ya se encuentra registrado`);
    }
}


const existeUsuarioId = async( id = '' ) => {
    if ( !(mongoose.isValidObjectId( id ) ) ) {
        throw new Error(`Id no valido`);
    }
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) {
        throw new Error(`El id(${id}) no existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioId
}