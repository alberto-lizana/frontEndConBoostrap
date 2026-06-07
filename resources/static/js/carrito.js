import { getClaveCarrito, getCarrito, getUsuarioLogueado } from "./storage.js";

document.addEventListener("DOMContentLoaded", async () => {

    const rutaImagenes = "../../static/img/";
    const claveCarrito = getClaveCarrito(getUsuarioLogueado());
    const carrito = getCarrito(claveCarrito);
    const btnPagar = document.getElementById('btnPagar');
    const carritoContainer = document.getElementById('carritoContainer');
    const agregaProductosContainer = document.getElementById('agregaProductos');
    
    verCarrito(carrito);

    function mostrarCarrito(carrito) {
        const contenedor = document.getElementById('carritoContainer');
        contenedor.innerHTML = '';

        carrito.forEach((item) => {
            const producto = document.createElement('div');
            producto.classList.add('producto');

            producto.innerHTML = `
                <div class="row p-3 mb-4 rounded align-items-center contorno">

                    <div class="col-12 col-md-3 text-center mb-3 mb-md-0">
                        <img class="img-fluid rounded-3" src="${rutaImagenes}${item.imagen}" alt="${item.nombre}">
                    </div>

                    <div class="col-10 col-md-9">

                        <div class="row mb-2">
                            <span class="col-6 letra-normal letra-normal-bold subtitulo">
                                Nombre:
                            </span>
                            <span class="col-6 letra-normal color-letra-dinamico">
                                ${item.nombre}
                            </span>
                        </div>

                        <div class="row mb-2 align-items-center">
                            <span class="col-6 letra-normal letra-normal-bold subtitulo">
                                Cantidad:
                            </span>

                            <div class="col-6 d-flex align-items-center gap-2">
                                <button class="btn btn-sm btn-success aumentar"
                                        data-id="${item.id}">
                                    ▲
                                </button>

                                <span class="letra-normal color-letra-dinamico">
                                    ${item.cantidad}
                                </span>

                                <button class="btn btn-sm btn-danger disminuir"
                                        data-id="${item.id}">
                                    ▼
                                </button>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <span class="col-6 letra-normal letra-normal-bold subtitulo">
                                Precio Unitario:
                            </span>
                            <span class="col-6 letra-normal color-letra-dinamico">
                                $${item.precio}
                            </span>
                        </div>

                        <div class="row mb-2">
                            <span class="col-6 letra-normal letra-normal-bold subtitulo">
                                Precio:
                            </span>
                            <span class="col-6 letra-normal color-letra-dinamico">
                                <del>$${item.precio * item.cantidad}</del>
                            </span>
                        </div>

                        <div class="row mb-2">
                            <span class="col-6 letra-normal letra-normal-bold subtitulo">
                                Descuento:
                            </span>
                            <span class="col-6 letra-normal color-letra-dinamico">
                                ${item.descuento * 100}%
                            </span>
                        </div>

                        <div class="row">
                            <span class="col-6 letra-normal letra-normal-bold subtitulo">
                                Precio Final:
                            </span>
                            <span class="col-6 letra-normal color-letra-dinamico">
                                $${((item.precio - (item.precio * item.descuento)) * item.cantidad).toFixed(0)}
                            </span>
                        </div>
                    </div>
                </div>
            `;

            contenedor.appendChild(producto);
            
            contenedor.querySelectorAll('.aumentar').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;
                    const producto = carrito.find(p => p.id == id);

                    if (producto) {
                        producto.cantidad++;
                    }

                    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
                    verCarrito(carrito);
                });
            });

            contenedor.querySelectorAll('.disminuir').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;

                    const producto = carrito.find(p => p.id == id);

                    if (producto) {
                        producto.cantidad--;

                        if (producto.cantidad <= 0) {
                            const indice = carrito.findIndex(p => p.id == id);
                            carrito.splice(indice, 1);
                        }
                    }

                    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
                    verCarrito(carrito);
                });
            });            
        })};

    function agregaProductos() {
        if (!agregaProductosContainer) return; 

        agregaProductosContainer.innerHTML = '';

        const producto = document.createElement('div');
        producto.classList.add('agregaProducto');

        producto.innerHTML = `
            <div class="col-12">  
                <h3>Agrega Productos</h3>
            </div>
        `;

        agregaProductosContainer.appendChild(producto);
    }

    function verCarrito(carrito) {
        carritoContainer.innerHTML = '';
        agregaProductosContainer.innerHTML = '';

        if (!carrito || carrito.length === 0) {

            btnPagar.classList.remove('activo');
            
            agregaProductos();
            return;
        }

        mostrarCarrito(carrito);
        btnPagar.classList.add('activo');
    }
});

