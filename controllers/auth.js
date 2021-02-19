const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const Usuario = require('../models/usuario');



const login = async( req, res = response ) => {


    const { correo, password } = req.body;

    try {
        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }


        // si el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado: false'
            });
        }


        // verificar la contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password);
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }



        // GENERAR EL JWT
        const token = await generarJWT( usuario._id );


        res.json({
            token,
            usuario
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal en login'
        });
    }

}



const googleSinging = async( req, res = response ) => {

    const { id_token } = req.body;

    try {

        const { nombre, correo, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Crear usuario
            const data= {
                nombre,
                correo,
                password: '...',
                img,
                google: true
            }
            usuario = new Usuario( data );
            usuario.save();
        }

        // Si el usuario en DB esta eliminado
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administradoe, usuario bloqueado'
            });
        }

        // GENERAR EL JWT
        const token = await generarJWT( usuario._id );


        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no reconocido',
        })
    }
}



module.exports = {
    login,
    googleSinging
}