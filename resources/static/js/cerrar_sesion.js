document.addEventListener("DOMContentLoaded", () => {
    const cerrarSesion = document.getElementById("cerrarSesion");

    cerrarSesion.addEventListener('click', () => {
        sessionStorage.removeItem("sesion");
        window.location.href = '../inicio_sesion.html';
    });

});