const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

const POSTER_300W_URL = 'https://image.tmdb.org/t/p/w300/';
const POSTER_500W_URL = 'https://image.tmdb.org/t/p/w500/';

// Utils

const printMoviePosters = (movies, section) => {
    section.innerHTML = "";

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            `${POSTER_300W_URL}${movie.poster_path}`
        );  

        movieContainer.appendChild(movieImg);
        section.appendChild(movieContainer);
    });
}

const printCategories = (categories, section) => {
    section.innerHTML = "";

    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute(
            'id',
            `id${category.id}`
        );
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        section.appendChild(categoryContainer);
    });
}

const printSimilarMovies = async (movieId, section) => {
    const { data } = await api(`/movie/${movieId}/similar`);
    const movies = data.results;
    console.log(movies);

    printMoviePosters(movies, section)
}
 
//

const getTrendingMovies = async () => {
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    printMoviePosters(movies, genericSection);
}

const getTrendingMoviesPreview = async () => {
    const { data } = await api('/trending/movie/day');
    const movies = data.results;
    console.log(movies);

    printMoviePosters(movies, trendingMoviesPreviewList);
}

const getMoviesByCategory = async (categoryId) => {
    const { data } = await api('/discover/movie', {
        params: {
            with_genres: categoryId,
        },
    }
    );
    const movies = data.results;

    printMoviePosters(movies, genericSection);
}

const getMoviesBySearch = async (query) => {
    const { data } = await api('/search/movie', {
        params: {
            query,
        },
    }
    );
    const movies = data.results;

    printMoviePosters(movies, genericSection);
}

const getCategoriesPreview = async () => {
    const { data } = await api('/genre/movie/list');
    const categories = data.genres;
    console.log(categories);

    printCategories(categories, categoriesPreviewList);
}

const getMovieDetail = async (movieId) => {
    const { data: movie } = await api(`/movie/${movieId}`);

    const movieImgUrl = `${POSTER_500W_URL}${movie.poster_path}`;
    console.log(movieImgUrl);
    headerSection.style.background =
        `linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.35) 19.27%, 
            rgba(0, 0, 0, 0) 29.17%), 
            url(${movieImgUrl}`;

    movieDetailTitle.textContent = movie.title;
    movieDetailScore.textContent = movie.vote_average;
    movieDetailDescription.textContent = movie.overview;

    printCategories(movie.genres, movieDetailCategoriesList);
    printSimilarMovies(movieId, relatedMoviesContainer)
}



