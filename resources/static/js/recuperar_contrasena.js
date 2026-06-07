import { limpiarFormulario, normalizarStringDic} from './funciones_reutilizables.js'

import {getUsuarios} from './storage.js';
    
document.addEventListener("DOMContentLoaded", async () => {
    const botonRecuperarPass = document.getElementById("botonRecuperarPass");
    const ventanaRecuperarContresena = document.getElementById("ventanaRecuperarContresena");
    const cerrarOlvidador = document.getElementById("cerrarOlvidador");
    const formOlvidador = document.getElementById("formOlvidador");

    let cuentasCreadas = await getUsuarios();

    botonRecuperarPass.addEventListener('click', () => {
        ventanaRecuperarContresena.classList.add("activo");
    });

    cerrarOlvidador.addEventListener("click", () => {
        ventanaRecuperarContresena.classList.remove("activo");
        limpiarFormulario(formOlvidador);
    });

    ventanaRecuperarContresena.addEventListener("click", (e) => {
        if (e.target === ventanaRecuperarContresena) {
            ventanaRecuperarContresena.classList.remove("activo");
            limpiarFormulario(formOlvidador);
        }
    });

    formOlvidador.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombreDelOlvidador = document.getElementById("nombreDelOlvidador");
        const apellidoPaternoDelOlvidador = document.getElementById("apellidoPaternoDelOlvidador");
        const emailDelOlvidador = document.getElementById("emailDelOlvidador");

        
        const data = normalizarStringDic ({
            "nombre": nombreDelOlvidador.value, 
            "appat": apellidoPaternoDelOlvidador.value,
            "email": emailDelOlvidador.value
        })

        const user = cuentasCreadas.find(
            item => item.nombre === data.nombre && item.appat === data.appat && item.email === data.email
        );

        if(user) return alert(user.contrasena);
        else return alert("Datos no coincidentes");

    });

});