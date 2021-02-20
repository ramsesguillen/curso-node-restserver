
const { Schema, model } = require('mongoose');


const CategoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// Eliminar el estado, __v, del objeto
CategoriaSchema.methods.toJSON = function() {
    const { estado, __v,  ...data } = this.toObject();
    return data;
}

// *el mobre del modelo es en singlular - pero mongoose le agrega una "s" en la coleccion
module.exports = model( 'Categoria', CategoriaSchema );







