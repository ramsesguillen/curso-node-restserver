const url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:4000/api/auth/' :
    'http://www.urlproduccion.com/api/auth/';

let usuario = null;
let socket = null;


const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');


const validarJWT = async() => {

    const token = localStorage.getItem('token') || '';

    if ( token.length <= 10 ) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch( url, {
        headers: { 'x-token': token }
    });
    const { usuario: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB );
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();
}


const conectarSocket = async() => {
    // const socket = io();
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        // console.log('conectado');
    });

    socket.on('disconnect', () => {
        console.log('Socket offline');
    });


    socket.on('recibir-mensaje', dibujarMensajes);
    socket.on('usuarios-conectados', dibujarUsuarios);

    socket.on('mensaje-privado', (payload) => {
        console.log('privado', payload);
    });
}


const dibujarUsuarios = ( usuarios = [] ) => {

    let userHtml = '';
    usuarios.forEach(({ nombre, uid}) => {
        userHtml += `
            <li>
                <p>
                    <h5 class="text-success">${ nombre }</h5>
                    <span class="fs-6 text-muted">${ uid }</span>
                </p>
            </li>
        `;
    });

    ulUsuarios.innerHTML = userHtml;
};


const dibujarMensajes = ( mensajes = [] ) => {

    let mensajeHtml = '';
    mensajes.forEach(({ nombre, mensaje }) => {
        mensajeHtml += `
            <li>
                <p>
                    <span class="text-primary">${ nombre }</span>
                    <span>${ mensaje }</span>
                </p>
            </li>
        `;
    });

    ulMensajes.innerHTML = mensajeHtml;
};


txtMensaje.addEventListener('keyup', ({ keyCode }) => {

    const mensaje = txtMensaje.value.trim();
    const uid = txtUid.value.trim();

    if ( keyCode !== 13 ) return;
    if ( mensaje.length === 0 ) return;

    socket.emit('enviar-mensaje', {uid, mensaje});

    txtMensaje.value = '';
});



const main = async () => {

    await validarJWT();
}


main();










