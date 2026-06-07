import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/esm/axios.min.js';

export function agregarAlCarrito(juego) {

    const claveCarrito = getClaveCarrito(getUsuarioLogueado());

    const carrito = getCarrito(claveCarrito);

    const productoExistente = carrito.find(
        item => item.id === juego.id
    );

    if (productoExistente) {
        productoExistente.cantidad++;

    } else {
        carrito.push({
            id: juego.id,
            nombre: juego.nombre,
            imagen: juego.imagen,
            precio: juego.precio,
            descuento: juego.descuento,
            cantidad: 1
        });
    }

    localStorage.setItem(
        claveCarrito,
    JSON.stringify(carrito));

}

export async function getProductos() {
    try {
        const response = await axios.get("../../static/JSON/producto/todos.json");
        return response.data;
    } catch (error) {
        console.error("Error al cargar productos:", error);
        return null;
    }
}

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

export function getClaveCarrito(usuarioLogueado){
    return `carrito_${usuarioLogueado.user.id}`;
}

export function getCarrito(claveCarrito) {
    return JSON.parse(
        localStorage.getItem(claveCarrito)) || [];
}

function getUsuariosLocales() {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
} 

export function getUsuarioLogueado() {
    return JSON.parse(
        sessionStorage.getItem("sesion")
    );
}