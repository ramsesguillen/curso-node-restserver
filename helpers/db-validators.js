const { Categoria, Producto } = require('../models');
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
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) {
        throw new Error(`El id(${id}) no existe`);
    }
}


const existeCategoria = async( id = '' ) => {
    const categoriaExiste = await Categoria.findById( id );
    if ( !categoriaExiste ) {
        throw new Error(`El id(${id}) categoria no existe`);
    }
}

const existeCategoriaNombre = async( nombre = '' ) => {
    const categoriaExiste = await Categoria.findOne({ nombre });
    if ( categoriaExiste ) {
        throw new Error(`El nombre(${nombre}) de la categoria ya existe`);
    }
}

const existeProductoId = async( id = '' ) => {
    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) {
        throw new Error(`El id(${id}) no existe`);
    }
}

const existeProductoNombre = async( nombre = '' ) => {
    const existeProducto = await Producto.findOne({ nombre });
    if ( existeProducto ) {
        throw new Error(`El producto(${nombre}) ya existe`);
    }
}


/**
 * Validar colecciones permitidas
 */

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección(${coleccion}) no es permitida: validas -> ${colecciones}`);
    }
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioId,
    existeCategoria,
    existeProductoId,
    existeProductoNombre,
    existeCategoriaNombre,
    coleccionesPermitidas
}