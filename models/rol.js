
const { Schema, model } = require('mongoose');


const RoleSchema = new Schema({
    rol: {
        type: String,
        required: [ true, 'El rol es obligatorio']
    },
});

// *el mobre del modelo es en singlular - pero mongoose le agrega una "s" en la coleccion
module.exports = model( 'Role', RoleSchema );