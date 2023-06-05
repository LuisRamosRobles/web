function comprobarSesion(){

    let username = document.getElementById("username");

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/comprobarSesion.php", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          let response = xhr.responseText.trim();
          if (response === "true") {
            username.textContent
          } else {
            window.location.href = "../html/logreg.html";
          }
      }
    };
    xhr.send();

    let xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "../php/comprobarUsuario.php", true);
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            let response = xhr2.responseText.trim();
            if (response != "false") {
                textUsername.textContent = "Usuario: " + response;
            } else {
                //Nada
            }
        }
    };
    xhr2.send();
  
}

const apiKey = '7d3a5003de5f2cc2c60ed0c40969a8e5';

function cargarPeliculas() {
  fetch('../php/listaVistos.php')
    .then(response => response.json())
    .then(ids => {
      if (ids.length === 0) {
        console.log('No se encontraron películas para el usuario.');
      } else {
        const promises = ids.map(id =>
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es`)
            .then(response => response.json())
        );

        Promise.all(promises)
          .then(movies => {
            createMovieElements(movies);
          })
          .catch(error => console.log(error));
      }
    })
    .catch(error => console.log(error));
}

function createMovieElements(movies) {
  let movieList = document.getElementById('listaVistos');
  let tituloTrailers = document.getElementById('titulo');
  let noPeliculas = document.getElementById('noPeliculas');

  noPeliculas.style.display = 'none';
  movieList.style.display = 'grid';
  tituloTrailers.style.display = 'block';

  movies.forEach(movie => {
    let movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    let image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    image.alt = movie.title;

    let overlay = document.createElement('div');
    overlay.classList.add('overlay');

    let title = document.createElement('h3');
    title.textContent = movie.title;

    let link = document.createElement('a');
    link.href = `./movie.html?id=${movie.id}`;

    overlay.appendChild(title);
    movieDiv.appendChild(image);
    movieDiv.appendChild(overlay);
    link.appendChild(movieDiv);
    movieList.appendChild(link);
  });
}
