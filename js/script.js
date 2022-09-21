const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a0814a81d9e0ea8e164320078c18b3cb&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovie(API_URL);

async function getMovie(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results)
    showMovies(data.results);
}


function showMovies(movies){
    main.innerHTML = '';

    movies.forEach(movie => {
        
        const {title,poster_path,vole_average,overview} = movie
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vole_average)}">${vole_average}</span>

            <div class="overview">
                <h3>overview<h3/>
               ${overview}
            </div>
            </div>
        `

        main.appendChild(movieElement);
    });


    function getClassByRate(vole_average) {
        if (vole_average > 8) {
            return 'green'
        } else if(vole_average >= 5) {
            return 'orange'
        }else{
            return 'red'
        }
    }
}




form.addEventListener('submit',(e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovie(SEARCH_API + searchTerm)

        search.value = '';
    }else{
        window.location.reload()
    }
})