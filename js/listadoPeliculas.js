const apiKey = '7d3a5003de5f2cc2c60ed0c40969a8e5'; // Reemplaza 'tu_api_key' con tu propia clave de API
const maxMovies = 70; // Número máximo de películas que deseas obtener
const moviesPerPage = 20; // Número de películas por página (20 es el valor máximo permitido por la API)

// Obtén la fecha actual en el formato "YYYY-MM-DD"
const currentDate = new Date().toISOString().split('T')[0];

function cargarPeliculas(){
  // Realizar una petición GET a la API de TMDb para obtener todas las películas populares y estrenadas en español
  let fetchMovies = async () => {
    let allMovies = [];
    let totalPages = Math.ceil(maxMovies / moviesPerPage);

    for (let page = 1; page <= totalPages; page++) {
      let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&sort_by=popularity.desc&primary_release_date.lte=${currentDate}&page=${page}&language=es&with_original_language=en`);
      let data = await response.json();
      let movies = data.results;
      allMovies = [...allMovies, ...movies];

      // Si se han obtenido menos películas que el número máximo deseado, ajusta el número total de páginas
      if (movies.length < moviesPerPage) {
        totalPages = Math.ceil(allMovies.length / moviesPerPage);
      }
    }

    return allMovies.slice(0, maxMovies);
  };

// Función para crear los elementos HTML de las películas
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
      link.href = `./html/movie.html?id=${movie.id}`; // Agregar el ID de la película como parámetro en la URL

      overlay.appendChild(title);
      movieDiv.appendChild(image);
      movieDiv.appendChild(overlay);
      link.appendChild(movieDiv); // Envolver el div de la película con el enlace
      movieList.appendChild(link);
    });
  };

  // Obtener y mostrar las películas
  fetchMovies()
    .then(movies => createMovieElements(movies))
    .catch(error => console.log(error));
}

function busquedaPeliculas(inputBusqueda){

  let busqueda = inputBusqueda.value

  if(busqueda != ""){
    let loader = document.getElementById('loader');
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
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${busqueda}&include_adult=false&sort_by=popularity.desc&primary_release_date.lte=${currentDate}&page=${page}&language=es&with_original_language=en`);
        let data = await response.json();
        let movies = data.results;
        allMovies = [...allMovies, ...movies];
  
        // Si se han obtenido menos películas que el número máximo deseado, ajusta el número total de páginas
        if (movies.length < moviesPerPage) {
          totalPages = Math.ceil(allMovies.length / moviesPerPage);
        }
      }
  
      return allMovies.slice(0, maxMovies);
    };
  
  // Función para crear los elementos HTML de las películas
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
        link.href = `./html/movie.html?id=${movie.id}`; // Agregar el ID de la película como parámetro en la URL
  
        overlay.appendChild(title);
        movieDiv.appendChild(image);
        movieDiv.appendChild(overlay);
        link.appendChild(movieDiv); // Envolver el div de la película con el enlace
        movieList.appendChild(link);
      });
    };
  
    // Obtener y mostrar las películas
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
