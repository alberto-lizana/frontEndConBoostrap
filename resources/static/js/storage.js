import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/esm/axios.min.js';

export async function getAdmin() {
    try {
        const response = await axios.get("../static/JSON/usuarios/admin.json");
        return response.data;
    } catch (error) {
        console.error("Error al cargar admin:", error);
        return null;
    }
}

export async function getUsuarios() {
    try {
        const response = await axios.get("../static/JSON/usuarios/usuarios.json");
        const usuariosJSON = response.data.usuarios;

        // Combina JSON + localStorage
        const usuariosLocales = getUsuariosLocales();
        return [...usuariosJSON, ...usuariosLocales];

    } catch (error) {
        console.error("Error al cargar usuarios:", error);
        return getUsuariosLocales();
    }
}

export function guardarUsuario(nuevoUsuario) {
    const usuariosLocales = getUsuariosLocales();

    nuevoUsuario.id = Date.now(); 
    usuariosLocales.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuariosLocales));
}

function getUsuariosLocales() {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
} 
