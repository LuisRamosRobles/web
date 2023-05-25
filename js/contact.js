function validarNombre(input) {
    if (input.validity.valueMissing) {
        input.setCustomValidity('Por favor, ingrese su nombre completo.');
    } else if (/^\s+$/.test(input.value)) {
        input.setCustomValidity('Ingresa un nombre valido.');
    } else {
        input.setCustomValidity('');
    }
}
    function validarTlfn(input) {
    // Remueve todos los caracteres que no sean números
    input.value = input.value.replace(/\D/g, '');

    // Limita la longitud del valor a 9 caracteres
    if (input.value.length < 9) {
        input.setCustomValidity('Ingrese el numero completo de 9 digito.');
    } else {
        input.setCustomValidity('');
    }
}