// const Categoria

const { Categoria } = require("../models");




const validarcategoriaUsuario = async( req, res, next ) => {

    const categoria = await Categoria.findById( req.body.categoria );

    if ( categoria.usuario.toString() !== req.usuario._id.toString() ) {
    // if ( JSON.stringify(categoria.usuario) !== JSON.stringify(req.usuario._id) ) {
        return res.status(400).json({
            msg: 'No cuenta con los permisos para esta categoria',
        });
    }

    next();
}



module.exports = {
    validarcategoriaUsuario
}
