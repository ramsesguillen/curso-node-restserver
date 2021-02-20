const mongoose = require('mongoose');


const validarObjectId = ( req, res, next ) => {
    if ( !(mongoose.isValidObjectId( req.params.id ) ) ) {
        return res.status(400).json({
            msg: `[${req.params.id}] no es un Id valido o registrado`
        });
    }

    next();
}



module.exports = {
    validarObjectId
}