window.addEventListener('load', function(){

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');
    const msgError = this.document.getElementById('msgError'); 
    const btnCerrarSesion = this.document.getElementById('btnCerrarSesion');
    btnCerrarSesion.addEventListener('click', logoutWebClient);

    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

function mostrarAlertaError(mensaje) {
    msgError.innerHTML = mensaje;
    msgError.style.display = 'block';
    msgSuccess.style.display = 'none'; 
}

//Función el cerrado de sesión con Feign Client
async function logoutWebClient() {

    const url = 'http://localhost:8083/login/logout-async';

    const request = {
        tipoDocumento: localStorage.getItem("tipoDocumento"),
        numeroDocumento: localStorage.getItem("numeroDocumento")
    };
    console.log('Datos enviados para cerrar sesión:', request);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const result = await response.json();
        console.log('Respuesta del servidor: ', result);

        if(result.resultado){
            localStorage.clear();
            window.location.replace('index.html');
        } else {
            mostrarAlertaError('Error al cerrar sesión'); 
        }
    } catch (error) {
        console.log('Error: Ocurrió un problema con la autenticación del logout', error);
        mostrarAlertaError('Error: Ocurrió un problema con la autenticación del logout');

    }
}