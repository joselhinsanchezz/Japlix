let movies = [];

// Load the movies when the page loads
window.onload = async function() {
    try {
        const response = await fetch('https://japceibal.github.io/japflix_api/movies-data.json');
        movies = await response.json(); 
        console.log(movies);  // Check if the movies are loading
    } catch (error) {
        console.error('Error loading movies:', error);
    }
};

// Function to display stars based on vote_average
function generateStars(vote_average) {
    const stars = Math.floor(vote_average / 2); // Convert from 10 to 5 stars
    return '★'.repeat(stars) + '☆'.repeat(5 - stars); // Fill with empty stars if necessary
}

// Function to filter and display the movies
document.getElementById('btnBuscar').addEventListener('click', function() {
    const searchInput = document.getElementById('inputBuscar').value.toLowerCase().trim();
    
    if (!searchInput) return; // If no search, do nothing

    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchInput) ||
        movie.tagline.toLowerCase().includes(searchInput) ||
        movie.overview.toLowerCase().includes(searchInput) ||
        movie.genres.some(genre => genre.name.toLowerCase().includes(searchInput))
    );
    
    displayMovies(filteredMovies);
});

// Function to display movies and additional info
function displayMovies(filteredMovies) {
    const list = document.getElementById('lista');
    list.innerHTML = ''; // Clear the list before adding new results

    filteredMovies.forEach(movie => {
        const item = document.createElement('li');
        item.classList.add('list-group-item', 'bg-dark', 'text-white', 'mb-2', 'rounded');
        
        item.innerHTML = `
            <h5>${movie.title}</h5>
            <p>${movie.tagline}</p>
            <p>${generateStars(movie.vote_average)}</p>
            <button class="btn btn-info mt-2" data-bs-toggle="collapse" data-bs-target="#info${movie.id}" aria-expanded="false" aria-controls="info${movie.id}">
                More Information
            </button>

            <!-- Collapsible container for additional info -->
            <div id="info${movie.id}" class="collapse mt-2">
                <p><strong>Release Year:</strong> ${new Date(movie.release_date).getFullYear()}</p>
                <p><strong>Duration:</strong> ${movie.runtime} minutes</p>
                <p><strong>Budget:</strong> $${movie.budget.toLocaleString()}</p>
                <p><strong>Revenue:</strong> $${movie.revenue.toLocaleString()}</p>
            </div>
        `;
        
        list.appendChild(item);
    });
}