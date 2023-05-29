function definirError(){

    let urlParams = new URLSearchParams(window.location.search);
    let error = urlParams.get('error');
    let mensajeInfo = document.getElementById('mensajeInfo');

    switch(error){
        case 'correo':
            mensajeInfo.textContent = 'El correo que has introducido ya está registrado';
            break;
        case 'usuario':
            mensajeInfo.textContent = 'El usuario que has introducido ya está registrado';
            break;
        case 'comun':
            mensajeInfo.textContent = 'Ha ocurrido un error con el registro, intentelo de nuevo más tarde';
            break;
    }

}