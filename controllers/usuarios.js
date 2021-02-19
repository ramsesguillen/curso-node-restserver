//* IMPORTS
const { response } = require('express');
const bcrypt = require('bcrypt');


const Usuario = require('../models/usuario');


//* FUNCTIONS
const usuariosGet = async(req = request, res = response ) => {

    const query = { estado: true };

    const { limite = 5, desde = 0 } = req.query;

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find( query )
                .skip( Number( desde ))
                .limit(Number( limite ))
    ]);

    res.json({
        total, usuarios
    });
}


const usuariosPost = async (req, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync( password, salt );

    await usuario.save();

    res.json({
        msg: 'Post API -controller',
        usuario
    });
}


const usuariosPut = async(req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;


    if ( password ) {
            // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        rest.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, rest );

    res.json({
        msg: 'Put API',
        usuario
    });
}


const usuariosDelete = async (req, res = response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json( usuario );
}






module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}