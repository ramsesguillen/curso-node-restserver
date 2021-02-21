const { Schema, model } = require('mongoose');


const ProductoSchema = new Schema({
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
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
    }
});

// Eliminar el estado, __v, del objeto
ProductoSchema.methods.toJSON = function() {
    const { estado, __v,  ...data } = this.toObject();
    return data;
}

// *el mobre del modelo es en singlular - pero mongoose le agrega una "s" en la coleccion
module.exports = model( 'Producto', ProductoSchema );


