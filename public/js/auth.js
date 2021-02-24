const miFormulario = document.querySelector('form');



const url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:4000/api/auth/' :
    'http://www.urlproduccion.com/api/auth/';

miFormulario.addEventListener('submit', e => {
    e.preventDefault();
    const formData = {};
    for ( let el of miFormulario.elements ) {
        if ( el.name.length > 0 ) {
            formData[el.name] = el.value;
        }
    }

    fetch(url+'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( formData )
    })
    .then(resp => resp.json() )
    .then( ({ msg, token }) => {
        if ( msg ) {
            console.log('error:', msg);
            return;
        }
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch(console.log);
})





function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;

    fetch(url+'google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_token
            })
        })
        .then(resp => {
            return resp.json();
        })
        .then(({ token }) => {
            localStorage.setItem('token', token);
        })
        .catch(console.log);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}