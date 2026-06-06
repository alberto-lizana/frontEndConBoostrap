document.addEventListener("DOMContentLoaded", () => {
    const cerrarSesion = document.getElementById("cerrarSesion");

    const sesion = JSON.parse(sessionStorage.getItem("sesion"));

    if(!sesion || !sesion.logueado){
        window.location.href = '../inicio_sesion.html';
        return;
    }

    cerrarSesion.addEventListener('click', () => {
        sessionStorage.removeItem("sesion");
        window.location.href = '../inicio_sesion.html';
    });

});