import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/esm/axios.min.js';

document.addEventListener("DOMContentLoaded", async () => {
    
    const rutaImagenes = "../../static/img/"
    const categoria = document.body.dataset.categoria;
    const productos = await obtenerProductos();

    if (!productos) return;

    mostrarJuegos(productos[categoria]);


    async function obtenerProductos() {
        try {
            const response = await axios.get("../../static/JSON/producto/todos.json");
            return response.data;
        } catch (error) {
            console.error("Error al cargar productos:", error);
            return null;
        }
    }

    function mostrarJuegos(juegos) {
        const contenedor = document.getElementById('juegosContainer');

        contenedor.innerHTML = '';

        juegos.forEach((juego) => {
            const precioFinal = juego.precio - (juego.precio * juego.descuento)
            const producto = document.createElement('div');
            producto.classList.add('producto');

            producto.innerHTML = `
                <div class="producto-imagen">
                    <img src="${rutaImagenes + juego.imagen}" alt="${juego.nombre}">
                </div>

                <h3 class="letra-especial subtitulo">${juego.nombre}</h3>

                <p class="letra-normal letra-normal-bold color-letra-dinamico mt-3 p-1">${juego.descripcion}</p>

                <div class="info-juego m-1">

                    <div class="item-info">
                        <span class="letra-normal letra-normal-bold subtitulo">Precio</span>
                        <span class="letra-normal color-letra-dinamico"><del>$${juego.precio}</del></span>
                    </div>

                    <div class="item-info">
                        <span class="letra-normal letra-normal-bold subtitulo">Descuento</span>
                        <span class="letra-normal color-letra-dinamico">${juego.descuento * 100}%</span>
                    </div>

                    <div class="item-info">
                        <span class="letra-normal letra-normal-bold subtitulo">Precio final</span>
                        <span class="letra-normal color-letra-dinamico">$${precioFinal}</span>
                    </div>

                    <div class="item-info">
                        <span class="letra-normal letra-normal-bold subtitulo">Jugadores</span>
                        <span class="letra-normal color-letra-dinamico">${juego.cant_jugadores}</span>
                    </div>

                    <div class="item-info">
                        <span class="letra-normal letra-normal-bold subtitulo">Duración</span>
                        <span class="letra-normal color-letra-dinamico">${juego.duracion}</span>
                    </div>

                    <div class="item-info">
                        <span class="letra-normal letra-normal-bold subtitulo">Dificultad</span>
                        <span class="letra-normal color-letra-dinamico">${generarDificultad(juego.dificultad)}</span>
                    </div>

                </div>

                <button class="btn-comprar letra-normal letra-normal-bold subtitulo">
                    Agregar al Carrito
                </button>
            `;

            contenedor.appendChild(producto);
        });

}});    

function generarDificultad(dificultad) {
    return "⭐".repeat(dificultad) + "☆".repeat(5 - dificultad);
}

