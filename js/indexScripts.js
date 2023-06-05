const apiKey = '7d3a5003de5f2cc2c60ed0c40969a8e5';
const maxMovies = 70;
const moviesPerPage = 20;

function cargarPeliculas(){
  let fetchMovies = async () => {
    let allMovies = [];
    let totalPages = Math.ceil(maxMovies / moviesPerPage);

    for (let page = 1; page <= totalPages; page++) {
      let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&sort_by=popularity.desc&page=${page}&language=es&with_original_language=en`);
      let data = await response.json();
      let movies = data.results;
      allMovies = [...allMovies, ...movies];

      if (movies.length < moviesPerPage) {
        totalPages = Math.ceil(allMovies.length / moviesPerPage);
      }
    }

    return allMovies.slice(0, maxMovies);
  };

  let createMovieElements = (movies) => {

    let movieList = document.getElementById('movieList');
    let loader = document.getElementById('loader');

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
      link.href = `./html/movie.html?id=${movie.id}`;

      overlay.appendChild(title);
      movieDiv.appendChild(image);
      movieDiv.appendChild(overlay);
      link.appendChild(movieDiv);
      movieList.appendChild(link);
    });

    loader.style.display = 'none';
    movieList.style.display = 'grid';
  };

  fetchMovies()
    .then(movies => createMovieElements(movies))
    .catch(error => console.log(error));
}

function busquedaPeliculas(inputBusqueda){

  let busqueda = inputBusqueda.value
  let movieList = document.getElementById('movieList');
  let loader = document.getElementById('loader');

  movieList.style.display = 'none';
  loader.style.display = 'block';

  if(busqueda != ""){
    let moviesContainer = document.getElementById('movieList');
    let movies = moviesContainer.getElementsByClassName('movie');
    let links = moviesContainer.getElementsByTagName('a');

    while (movies.length > 0) {
      movies[0].remove();
      links[0].remove();
    }

    let fetchMovies = async () => {
      let allMovies = [];
      let totalPages = Math.ceil(maxMovies / moviesPerPage);
  
      for (let page = 1; page <= totalPages; page++) {
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${busqueda}&include_adult=false&sort_by=popularity.desc&page=${page}&language=es&with_original_language=en`);
        let data = await response.json();
        let movies = data.results;
        allMovies = [...allMovies, ...movies];
  
        if (movies.length < moviesPerPage) {
          totalPages = Math.ceil(allMovies.length / moviesPerPage);
        }
      }
  
      return allMovies.slice(0, maxMovies);
    };
  
    let createMovieElements = (movies) => {
      let movieList = document.getElementById('movieList');
  
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
        link.href = `./html/movie.html?id=${movie.id}`;
  
        overlay.appendChild(title);
        movieDiv.appendChild(image);
        movieDiv.appendChild(overlay);
        link.appendChild(movieDiv);
        movieList.appendChild(link);
      });

      loader.style.display = 'none';
      movieList.style.display = 'grid';
    };
  
    fetchMovies()
      .then(movies => createMovieElements(movies))
      .catch(error => console.log(error));
  }else{
    let moviesContainer = document.getElementById('movieList');
    let movies = moviesContainer.getElementsByClassName('movie');
    let links = moviesContainer.getElementsByTagName('a');

    while (movies.length > 0) {
      movies[0].remove();
      links[0].remove();
    }

    cargarPeliculas()
  }

}

function comprobarSesion(){

  let login = document.getElementById("login");
  let logout = document.getElementById("logout");
  let username = document.getElementById("username");
  let textUsername = document.getElementById("textUsername");
  let userList = document.getElementById("userList");

  logout.addEventListener("click", function() {
    let xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "./php/cerrarSesion.php", true);
    xhr1.onreadystatechange = function() {
      if (xhr1.readyState === 4 && xhr1.status === 200) {
        window.location.reload()
      }
    };
    xhr1.send();
  });

  let xhr2 = new XMLHttpRequest();
  xhr2.open("POST", "./php/comprobarSesion.php", true);
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
  xhr3.open("POST", "./php/comprobarUsuario.php", true);
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

  let xhr4 = new XMLHttpRequest();
  xhr4.open("POST", "./php/comprobarAdmin.php", true);
  xhr4.onreadystatechange = function() {
    if (xhr4.readyState === 4 && xhr4.status === 200) {
        let response = xhr4.responseText.trim();
        if (response == 1) {
          userList.style.display = "block";
        } else {
          userList.style.display = "none";
        }
    }
  };
  xhr4.send();

}