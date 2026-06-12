import { 
    validarNombre, validarApellido, validarEmail, 
    validarContrasena, normalizarStringDic, limpiarFormulario, 
    validarCamposObligatorios, noVacios, validarCampos
} from './funciones_reutilizables.js'

import { getUsuarioLogueado } from './storage.js';

document.addEventListener("DOMContentLoaded", async () => {

    const botonModificarPerfil = document.getElementById('modificarPerfil')
    const ventanaModificarPerfil = document.getElementById('ventanaModificarPerfil');
    const cerrarModificarUsuario = document.getElementById('cerrarModificarUsuario');

    const formModificarCuenta = document.getElementById('formModificarCuenta');

    // localStorage.clear();
    // sessionStorage.clear();

    formModificarCuenta.addEventListener('submit', async (e) => {
        e.preventDefault();
        modificarPerfil();
    })

    botonModificarPerfil.addEventListener('click', () => {
        ventanaModificarPerfil.classList.add("activo");
    });

    cerrarModificarUsuario.addEventListener("click", () => {
        ventanaModificarPerfil.classList.remove("activo");
        limpiarFormulario(formModificarCuenta);
    });

    ventanaModificarPerfil.addEventListener("click", (e) => {
        if (e.target === ventanaModificarPerfil) {
            ventanaModificarPerfil.classList.remove("activo");
            limpiarFormulario(formModificarCuenta);
        }
    });    

    async function modificarPerfil() {
        const sesion = getUsuarioLogueado();
        const user = sesion.user;

        const usuarioActualizado = normalizarStringDic({
            ...user,
            nombre: modificarNombreUser.value || user.nombre,
            appat: modificarApellidoPaterno.value || user.appat,
            apmat: modificarApellidoMaterno.value || user.apmat,
            email: modificarEmailUsuario.value || user.email,
            direccion: modificarDireccionUsuario.value || user.direccion,
            contrasena: modificarContrasenaUsuario.value || user.contrasena,
            r_contrasena: modificarContrasenaUsuario.value || user.r_contrasena
        });

        if (!validarCamposObligatorios(usuarioActualizado)) return;

        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

        const index = usuarios.findIndex(u => u.id === user.id);

        if (index !== -1) {
            usuarios[index] = usuarioActualizado;
        }

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // ACTUALIZAR SESIÓN
        const nuevaSesion = {
            ...sesion,
            user: usuarioActualizado
        };

        sessionStorage.setItem("sesion", JSON.stringify(nuevaSesion));

        alert("Perfil actualizado correctamente");
    }

});