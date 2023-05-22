// Obtener el ID de la película de la URL (suponiendo que se pasa como parámetro)
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Obtener la referencia a los elementos HTML
const posterImage = document.getElementById('posterImage');
const movieTitle = document.getElementById('movieTitle');
const movieOverview = document.getElementById('movieOverview');
const movieReleaseDate = document.getElementById('movieReleaseDate');
const movieRating = document.getElementById('movieRating');
const movieAuthor = document.getElementById('movieAuthor');

// URL de la API de TMDB para obtener los detalles de una película específica
const apiKey = '7d3a5003de5f2cc2c60ed0c40969a8e5';
const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es`;
const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=es`;

// Hacer la solicitud a la API de TMDB para obtener los detalles de la película
fetch(movieUrl)
  .then(response => response.json())
  .then(movieData => {
    // Rellenar los elementos HTML con los datos obtenidos
    posterImage.src = `https://image.tmdb.org/t/p/w300${movieData.poster_path}`;
    movieTitle.textContent = movieData.title;
    movieOverview.textContent = movieData.overview;
    movieReleaseDate.textContent = `Fecha de estreno: ${movieData.release_date}`;
    movieRating.textContent = `Calificación: ${movieData.vote_average}`;

    // Obtener el director de la película
    fetch(creditsUrl)
      .then(response => response.json())
      .then(creditsData => {
        const director = creditsData.crew.find(member => member.job === 'Director');
        if (director) {
          const directorName = director.name;
          movieAuthor.textContent = `Autor: ${directorName}`;
        } else {
          movieAuthor.textContent = 'Autor: Desconocido';
        }
      })
      .catch(error => {
        console.error('Error al obtener los créditos de la película:', error);
      });
  })
  .catch(error => {
    console.error('Error al obtener los detalles de la película:', error);
  });
