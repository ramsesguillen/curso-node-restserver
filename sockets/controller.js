const { Socket } = require("socket.io")
const { comprobarJWT } = require("../helpers")
const ChatMensajes = require('../models/chat-mensajes')

const chatMensajes = new ChatMensajes();


const socketController = async ( socket = new Socket, io ) => {

    const token = socket.handshake.headers['x-token'];
    const usuario = await comprobarJWT(token);

    if ( !usuario ) {
        return socket.disconnect();
    }

    // Agregar el usuario conectado
    chatMensajes.conectarUsuario( usuario );
    io.emit('usuarios-conectados', chatMensajes.usuariosArr );
    io.emit('recibir-mensaje', chatMensajes.ultimos10 );


    // Conectar a una sala especial
    socket.join( usuario.id ); // tres salas: global, socket.id, usuario.id


    // limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id);
        io.emit('usuarios-conectados', chatMensajes.usuariosArr );
    })

    socket.on('enviar-mensaje', ({ uid, mensaje}) => {

        if ( uid ) {
            // mensaje privado
            socket.to( uid ).emit('mensaje-privado', { de: usuario.nombre, mensaje });
        } else {
            chatMensajes.enviarMensaje( usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensaje', chatMensajes.ultimos10 );
        }

    })
}


module.exports = {
    socketController
}