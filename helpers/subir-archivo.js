const path = require('path');
const { v4: uuidv4 } = require('uuid');


const subirArchivo = ( file, extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {

    return new Promise((resolve, reject) => {
        const { archivo } = file;
        const nombreCortado = archivo.name.split('.');
        const extencion = nombreCortado[ nombreCortado.length - 1];

        // Valida la extencion
        if ( !extencionesValidas.includes( extencion ) ) {
            return reject(`La extención ${extencion} no es permitida -> ${extencionesValidas}`);
        }

        const nombreTemp = uuidv4() + '.' + extencion;
        const uploadPath = path.join( __dirname,'../uploads/', carpeta, nombreTemp );

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function(err) {
        if (err) {
            return reject(err);
        }
            resolve( nombreTemp );
        });
    });

}



module.exports = {
    subirArchivo
}

