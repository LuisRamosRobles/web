history.pushState(null, null, document.URL);
window.addEventListener('popstate', function(event) {
  history.pushState(null, null, document.URL);
});

window.addEventListener('popstate', function(event) {
  window.location.href = "./errorAdmin.html";
});
