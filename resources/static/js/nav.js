document.addEventListener("DOMContentLoaded", () => {
    const btoSubmenu = document.getElementById("boton-submenu");
    const submenu = document.getElementById("submenu-categorias");
    const btoResponsive = document.getElementById("nav-responsive-icon");
    const menu = document.getElementById("nav-interactivo");


    btoSubmenu.addEventListener('click', (ev) => {
        ev.stopPropagation(); 
        submenu.classList.toggle("submenu-activo");
    });

    btoResponsive.addEventListener('click', (ev) => {
        ev.stopPropagation(); 
        menu.classList.toggle("nav-responsive");
        console.log("click");
    });

    document.addEventListener('click', () => {
        cerrarMenu();        
    });

    function cerrarMenu() {
        submenu.classList.remove("submenu-activo");
        menu.classList.remove("nav-responsive");
    }

});