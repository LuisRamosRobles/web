// Reemplaza la URL actual en el historial del navegador
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function(event) {
  // Vuelve a reemplazar la URL en caso de que el usuario intente volver atrás
  history.pushState(null, null, document.URL);
});

// Código adicional de tu página 2

// Si el usuario intenta volver a la página 1, redirígelo a otra página
window.addEventListener('popstate', function(event) {
  window.location.href = "./errorAdmin.html"; // Cambia "otra_pagina.html" por la URL de la página a la que deseas redirigir al usuario
});
