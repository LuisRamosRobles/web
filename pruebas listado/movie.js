// Obtener el ID de la película de la URL (suponiendo que se pasa como parámetro)
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Obtener la referencia a los elementos HTML
const errorBox = document.getElementById('errorBox');
const movieDetails = document.getElementById('movieDetails');
const posterImage = document.getElementById('posterImage');
const movieTitle = document.getElementById('movieTitle');
const movieOverview = document.getElementById('movieOverview');
const movieReleaseDate = document.getElementById('movieReleaseDate');
const movieRating = document.getElementById('movieRating');
const movieAuthor = document.getElementById('movieAuthor');
const movieButton = document.getElementById('movieButton');
const movieRuntime = document.getElementById('movieRuntime');

// Verificar si se proporciona un ID de película válido
if (!movieId) {
  // Ocultar el div de los detalles de la película y mostrar el cuadro de error
  movieDetails.style.display = 'none';
  errorBox.style.display = 'block';
} else {
  // URL de la API de TMDB para obtener los detalles de una película específica
  const apiKey = '7d3a5003de5f2cc2c60ed0c40969a8e5';
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es&with_original_language=en`;
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
      movieRuntime.textContent = `Duración: ${movieData.runtime} minutos`;

      // Obtener los créditos de la película para obtener el director
      fetch(creditsUrl)
        .then(response => response.json())
        .then(creditsData => {
          const director = creditsData.crew.find(member => member.job === 'Director');
          if (director) {
            movieAuthor.textContent = `Director: ${director.name}`;
          }
        })
        .catch(error => {
          console.error('Error al obtener los créditos de la película:', error);
        });
    })
    .catch(error => {
      console.error('Error al obtener los detalles de la película:', error);
    });
}
