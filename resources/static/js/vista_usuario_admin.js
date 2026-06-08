import {getUsuarioLogueado} from './storage.js';

document.addEventListener("DOMContentLoaded", () => {
    const rutaTemplatesAdmin = '../../templates/admin/'

    desplegarVolverVistaAdmin();

    function crearVolverVistaAdmin() {
        const contenedor = document.getElementById('volverVistaAdmin');

        const boton = document.createElement('button');

        boton.className =
            'btn btn-bd-primary letra-normal p-2 d-block text-center color-letra-dinamico';

        boton.textContent = 'Vista Admin';

        boton.addEventListener('click', () => {
            window.location.href = '../../templates/admin/home_admin.html';
        });

        contenedor.appendChild(boton);
    }

        function desplegarVolverVistaAdmin(){
            const usuarioSesion = getUsuarioLogueado();

            if(usuarioSesion.user.rol === 'admin') {
                crearVolverVistaAdmin();
            } else {
                return;
            }
        }
 });
