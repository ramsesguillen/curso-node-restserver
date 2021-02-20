const { response } = require("express")
const { Categoria } = require('../models')



const obtenerCategorias = async( req, res = response ) => {
    // pagina, total, populate
    const { desde = 5, limite = 0 } = req.query;

    const query = { estado: true};
    const [ categorias, total ] = await Promise.all([
        Categoria.find(query)
                    .skip( Number( desde ))
                    .limit(Number( limite ))
                    .populate('usuario', 'nombre'),
        Categoria.countDocuments(query)
    ]);

    return res.json({
        total,
        categorias
    })
}



const obtenerCategoria = async( req, res = response ) => {
    // populate
    const { id } = req.params;

    const categoria = await Categoria.findById(id)
                                .populate('usuario', 'nombre');

    return res.json({
        categoria
    })
}



const crearCategoria = async( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria(${categoriaDB.nombre }) ya existe`
        });
    }

    // Generar la data a guardar(para:validar lo que se va a insertar a la db)
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );
    await categoria.save();

    res.status(201).json(categoria);
}



const actuliazarCategoria = async( req, res = response ) => {

    const { id } = req.params;
    let { nombre } = req.body;
    nombre = nombre.toUpperCase();

    // { new: true} - para ver los cambios reflejados en el json
    const categoria = await Categoria.findByIdAndUpdate(id, {nombre}, { new: true});

    return  res.json({
        categoria
    });

}



const borrarCategoria  = async( req, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true});

    return  res.json({
        categoria
    });
}






module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actuliazarCategoria,
    borrarCategoria
}