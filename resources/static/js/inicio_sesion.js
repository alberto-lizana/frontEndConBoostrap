import { validarEmail, normalizarString, limpiarFormulario } from './funciones_reutilizables.js'
import { getAdmin, getUsuarios } from './storage.js';

document.addEventListener("DOMContentLoaded", async () => {

    const iniciarSesionForm = document.getElementById("iniciarSesionForm");
    const emailUser = document.getElementById("emailUser");
    const contrasenaUser = document.getElementById("contrasenaUser");
    const administrador = await getAdmin();


    iniciarSesionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validarEmail(emailUser.value)) {
            return alert("Email inválido");
        }

        const data = {
            email: normalizarString(emailUser.value),
            contrasena: contrasenaUser.value.trim()
        };

        if (isAdmin(administrador, data)) {
            alert('Administrador iniciado.');

            limpiarFormulario(iniciarSesionForm);

            sessionStorage.setItem(
                "sesion",
                JSON.stringify({
                    logueado: true,
                    user: administrador
                })
            );

            window.location.href = '../templates/admin/inicio_admin.html';
            return;
        }
    
        const usuarios = await getUsuarios();

        const user = usuarios.find(
            item => item.email === data.email && item.contrasena === data.contrasena
        );

        if (user) {
            alert(`Bienvenido ${user.nombre} ${user.appat} ${user.apmat}.`);
            
            sessionStorage.setItem(
                "sesion",
                JSON.stringify({
                    logueado: true,
                    user: user 
                })
            );

            limpiarFormulario(iniciarSesionForm);
            
            return window.location.href = '../templates/user/inicio_user.html';
        
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
});

function isAdmin(administrador, data) {
    if (!administrador) return false;
    return (
        administrador.email === data.email &&
        administrador.contrasena === data.contrasena &&
        administrador.rol === "admin"
    );
}
