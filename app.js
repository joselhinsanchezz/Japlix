document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('results');
    let movies = [];

    // Cargar los datos de las películas desde la API
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            movies = data;
        })
        .catch(error => console.error('Error cargando los datos:', error));

    // Función para convertir el voto en estrellas
    function renderStars(voteAverage) {
        const totalStars = 5;
        const fullStars = Math.round((voteAverage / 10) * totalStars);
        return '★'.repeat(fullStars) + '☆'.repeat(totalStars - fullStars);
    }

    // Función para mostrar los resultados de la búsqueda
    function displayResults(filteredMovies) {
        resultsContainer.innerHTML = ''; // Limpiar resultados previos

        if (filteredMovies.length === 0) {
            resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
            return;
        }

        filteredMovies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            const title = document.createElement('h3');
            title.textContent = movie.title;

            const tagline = document.createElement('p');
            tagline.textContent = movie.tagline || 'Sin tagline';

            const stars = document.createElement('p');
            stars.classList.add('stars');
            stars.textContent = renderStars(movie.vote_average);

            movieDiv.appendChild(title);
            movieDiv.appendChild(tagline);
            movieDiv.appendChild(stars);

            resultsContainer.appendChild(movieDiv);
        });
    }

    // Función para buscar las películas que coincidan con el input
    function searchMovies() {
        const searchTerm = searchInput.value.toLowerCase();
        if (!searchTerm) return;

        const filteredMovies = movies.filter(movie => {
            return (
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.genres.some(genre => genre.toLowerCase().includes(searchTerm)) ||
                (movie.tagline && movie.tagline.toLowerCase().includes(searchTerm)) ||
                (movie.overview && movie.overview.toLowerCase().includes(searchTerm))
            );
        });

        displayResults(filteredMovies);
    }

    // Evento de clic en el botón de búsqueda
    searchButton.addEventListener('click', searchMovies);

    // Permitir la búsqueda al presionar "Enter"
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchMovies();
        }
    });
});
