const { response } = require("express");
const { Producto } = require('../models')




const obtenerProductos = async( req, res = response ) => {
    const { desde = 5, limite = 0 } = req.query;

    const query = { estado: true};
    const [ productos, total ] = await Promise.all([
        Producto.find(query)
                    .skip( Number( desde ))
                    .limit(Number( limite ))
                    .populate('usuario', 'nombre')
                    .populate('categoria', 'nombre'),
        Producto.countDocuments(query)
    ]);

    return res.json({
        total,
        productos
    })
}


const obtenerProducto = async( req, res = response ) => {
    // populate
    const { id } = req.params;

    const producto = await Producto.findById(id)
                                .populate('usuario', 'nombre')
                                .populate('categoria', 'nombre');

    return res.json({
        producto
    })
}



const crearProducto = async( req, res = response ) => {

    const { usuario, estado, ...rest } = req.body;

    const data = {
        ...rest,
        usuario: req.usuario._id
    }

    const producto = new Producto( data );
    await producto.save();

    res.status(201).json(producto);
}


const actuliazarProducto = async( req, res = response ) => {

    const { id } = req.params;
    let { usuario, estado,...rest } = req.body;

    const data = {
        ...rest
    }
    // { new: true} - para ver los cambios reflejados en el json
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true});

    return  res.json({
        producto
    });

}


const borrarProducto  = async( req, res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true});

    return  res.json({
        producto
    });
}



module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actuliazarProducto,
    borrarProducto
}

