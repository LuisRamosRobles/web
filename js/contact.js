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

function comprobarSesion(){

    let login = document.getElementById("login");
    let logout = document.getElementById("logout");
    let username = document.getElementById("username");
    let textUsername = document.getElementById("textUsername");
  
    logout.addEventListener("click", function() {
      let xhr1 = new XMLHttpRequest();
      xhr1.open("POST", "../php/cerrarSesion.php", true);
      xhr1.onreadystatechange = function() {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
          window.location.reload()
        }
      };
      xhr1.send();
    });
  
    let xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "../php/comprobarSesion.php", true);
    xhr2.onreadystatechange = function() {
      if (xhr2.readyState === 4 && xhr2.status === 200) {
          let response = xhr2.responseText.trim();
          if (response === "true") {
              login.style.display = "none";
              logout.style.display = "block";
          } else {
              login.style.display = "block";
              logout.style.display = "none";
          }
      }
    };
    xhr2.send();
  
    let xhr3 = new XMLHttpRequest();
    xhr3.open("POST", "../php/comprobarUsuario.php", true);
    xhr3.onreadystatechange = function() {
      if (xhr3.readyState === 4 && xhr3.status === 200) {
          let response = xhr3.responseText.trim();
          if (response != "false") {
              username.style.display = "block";
              textUsername.textContent = "Usuario: " + response;
          } else {
            username.style.display = "none";
            textUsername.textContent = "";
          }
      }
    };
    xhr3.send();
  
  }