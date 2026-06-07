
export const validarNombre = (nombre) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
    return regex.test(nombre);
};

export const validarApellido = (apellido) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:[-'\s][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    return regex.test(apellido);
};

export const validarContrasena = (contrasena) => {
    const regex = /^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}(?<!\s)$/;
    return regex.test(contrasena);
};

export const validarEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const limpiarFormulario = (form) => form.reset();

export const normalizarString = (str) => str.trim().toLowerCase();

export const normalizarStringDic = (dic) => ({
    ...dic,
    nombre: dic.nombre?.trim().toLowerCase(),
    appat: dic.appat?.trim().toLowerCase(),
    apmat: dic.apmat?.trim().toLowerCase(),
    email: dic.email?.trim().toLowerCase(),
    contrasena: dic.contrasena?.trim(),
    r_contrasena: dic.r_contrasena?.trim(),
    direccion: dic.direccion?.trim().toLowerCase()
});
