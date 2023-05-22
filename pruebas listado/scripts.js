const apiKey = '7d3a5003de5f2cc2c60ed0c40969a8e5';
const maxMovies = 70; // Número máximo de películas que deseas obtener
const moviesPerPage = 20; // Número de películas por página (20 es el valor máximo permitido por la API)

// Obtén la fecha actual en el formato "YYYY-MM-DD"
const currentDate = new Date().toISOString().split('T')[0];

// Realizar una petición GET a la API de TMDb para obtener todas las películas populares y estrenadas en español
const fetchMovies = async () => {
  let allMovies = [];
  let totalPages = Math.ceil(maxMovies / moviesPerPage);

  for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_date.lte=${currentDate}&page=${page}&language=es`);
    const data = await response.json();
    const movies = data.results;
    allMovies = [...allMovies, ...movies];

    // Si se han obtenido menos películas que el número máximo deseado, ajusta el número total de páginas
    if (movies.length < moviesPerPage) {
      totalPages = Math.ceil(allMovies.length / moviesPerPage);
    }
  }

  return allMovies.slice(0, maxMovies);
};

// Función para crear los elementos HTML de las películas
const createMovieElements = (movies) => {
  const movieList = document.getElementById('movieList');

  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    image.alt = movie.title;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const title = document.createElement('h3');
    title.textContent = movie.title;

    overlay.appendChild(title);
    movieDiv.appendChild(image);
    movieDiv.appendChild(overlay);
    movieList.appendChild(movieDiv);
  });
};

// Obtener y mostrar las películas
fetchMovies()
  .then(movies => createMovieElements(movies))
  .catch(error => console.log(error));
