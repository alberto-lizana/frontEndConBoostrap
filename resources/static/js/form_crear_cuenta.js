import { 
    validarNombre, validarApellido, validarEmail, 
    validarContrasena, normalizarStringDic, limpiarFormulario 
} from './funciones_reutilizables.js'

import { getUsuarios, guardarUsuario } from './storage.js';

document.addEventListener("DOMContentLoaded", async () => {

    const formCrearCuenta = document.getElementById("formCrearCuenta");
    const botonCrearCuenta = document.getElementById("botonCrearCuenta");
    const ventanaCrearUsuario = document.getElementById("ventanaCrearUsuario");
    const cerrarCrearUsuario = document.getElementById("cerrarCrearUsuario");

    const crearNombreUsuario = document.getElementById("crearNombreUser");
    const crearApellidoPaterno = document.getElementById("crearApellidoPaterno");
    const crearApellidoMaterno = document.getElementById("crearApellidoMaterno");
    const crearEmailUsuario = document.getElementById("crearEmailUsuario");
    const crearDireccionUsuario = document.getElementById("crearDireccionUsuario");
    const crearContrasenaUsuario = document.getElementById("crearContrasenaUsuario");
    const crearRepetirContrasenaUsuario = document.getElementById("crearRepetirContrasenaUsuario");

    let cuentasCreadas = await getUsuarios();

    botonCrearCuenta.addEventListener('click', () => {
        ventanaCrearUsuario.classList.add("activo");
    });

    cerrarCrearUsuario.addEventListener("click", () => {
        ventanaCrearUsuario.classList.remove("activo");
        limpiarFormulario(formCrearCuenta);
    });

    ventanaCrearUsuario.addEventListener("click", (e) => {
        if (e.target === ventanaCrearUsuario) {
            ventanaCrearUsuario.classList.remove("activo");
            limpiarFormulario(formCrearCuenta);
        }
    });

    formCrearCuenta.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = normalizarStringDic({
            id: null,
            nombre: crearNombreUsuario.value,
            appat: crearApellidoPaterno.value,
            apmat: crearApellidoMaterno.value,
            email: crearEmailUsuario.value,
            contrasena: crearContrasenaUsuario.value,
            r_contrasena: crearRepetirContrasenaUsuario.value,
            direccion: crearDireccionUsuario.value,
            rol: "user"
        });

        if (!validarCamposObligatorios(data)) return;

        const emailExiste = cuentasCreadas.some(u => u.email === data.email);
        if (emailExiste) return alert("Ya existe una cuenta con ese email");

        guardarUsuario(data);
        cuentasCreadas = await getUsuarios();

        alert("Cuenta creada con éxito");
        ventanaCrearUsuario.classList.remove("activo");
        limpiarFormulario(formCrearCuenta);
    });


    function validarCamposObligatorios(data) {
        if (!noVacios(data)) { alert("Completa todos los campos obligatorios"); return false; }
        if (!validarCampos(data)) { alert("Formato de datos inválido"); return false; }
        if (data.contrasena !== data.r_contrasena) { alert("Las contraseñas no coinciden"); return false; }
        return true;
    }

    function noVacios(data) {
        return !(
            data.nombre === "" || data.appat === "" ||
            data.email === "" || data.direccion === "" ||
            data.contrasena === "" || data.r_contrasena === ""
        );
    }

    function validarCampos(data) {
        return (
            validarNombre(data.nombre) &&
            validarApellido(data.appat) &&
            (data.apmat.trim() === "" || validarApellido(data.apmat)) &&
            validarEmail(data.email) &&
            validarContrasena(data.contrasena) &&
            validarContrasena(data.r_contrasena)
        );
    }
});