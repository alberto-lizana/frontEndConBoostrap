document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("l&d-input");
    const body = document.body;

    // cargar estado guardado
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark");
        toggle.checked = true;
    }

    // cambiar tema y guardar estado
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark");
            localStorage.setItem("theme", "");
        }
    });
});