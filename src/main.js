// Data


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

const movieIsLiked = (movie, button) => {
    let likedMovies = likedMovieList();

    if(likedMovies[movie.id]) {
        button.classList.add('movie-bttn--liked');
        button.classList.add('movie-bttn');
    } else {
        button.classList.remove('movie-bttn--liked');
        button.classList.add('movie-bttn');
    } 
}

const likedMovieList = () => {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if (item) {
        movies = item;
    } else {
        movies = {};
    }

    return movies;
}

const likeMovie = (movie) => {
    let likedMovies = likedMovieList();

    if(likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;    
    } 
    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
    if (location.hash == ''){
        getLikedMovies();
        getTrendingMoviesPreview();      
    }
}

const POSTER_300W_URL = 'https://image.tmdb.org/t/p/w300/';
const POSTER_500W_URL = 'https://image.tmdb.org/t/p/w500/';

// Utils

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    })
})

const printMoviePosters = (movies, section, lazyLoad = false) => {
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');


        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            `${POSTER_300W_URL}${movie.poster_path}`
        );
        movieImg.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 
            `https://via.placeholder.com/300x450/5c218a/ffffff?text=${movie.title}`)
        });

        const movieBttn = document.createElement('button');
        movieBttn.classList.add('movie-bttn');
        likedMovieList()[movie.id] && movieBttn.classList.add('movie-bttn--liked');
        movieBttn.addEventListener('click', () => {
            likeMovie(movie);
            movieBttn.classList.toggle('movie-bttn--liked');
        });

        if (lazyLoad) {
            lazyLoader.observe(movieImg)
        };
        

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBttn);
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

    relatedMoviesContainer.innerHTML = "";
    printMoviePosters(movies, section, true)
}

async function getPaginatedMovies(
    endPoint, 
    {
        categoryId, 
        query
    } = {},
    ) {
    const { 
        scrollTop, 
        scrollHeight, 
        clientHeight 
    } = document.documentElement;

    const scrollAtBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;

    if (scrollAtBottom && pageIsNotMax) {
        page++;

        const { data } = await api(endPoint, {
            params: {
                page,
                with_genres: categoryId,
                query,
            },
        });
        const movies = data.results;

        printMoviePosters(movies, genericSection, true);
    } else if (scrollAtBottom && !pageIsNotMax) {
        maxPageReached.classList.remove('inactive');
    };
}

// API

async function getTrendingMovies () {
    const { data } = await api('/trending/movie/day');
    const movies = data.results;
    maxPage = data.total_pages;

    printMoviePosters(movies, genericSection, true);
}

function getPaginatedTrendingMovies() {
    getPaginatedMovies('/trending/movie/day');
}

const getTrendingMoviesPreview = async () => {
    const { data } = await api('/trending/movie/day');
    const movies = data.results;
    trendingMoviesPreviewList.innerHTML = "";
    printMoviePosters(movies, trendingMoviesPreviewList, true);
}

const getMoviesByCategory = async (categoryId) => {
    const { data } = await api('/discover/movie', {
        params: {
            with_genres: categoryId,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;

    printMoviePosters(movies, genericSection, true);
}

function getPaginatedMoviesByCategory(categoryId) {
    return function () {
        getPaginatedMovies('/discover/movie', {categoryId});
    }
}

const getMoviesBySearch = async (query) => {
    const { data } = await api('/search/movie', {
        params: {
            query,
        },
    }
    );
    const movies = data.results;
    maxPage = data.total_pages;

    printMoviePosters(movies, genericSection, true);
}

function getPaginatedMoviesBySearch(query) {
    return function () {
        getPaginatedMovies('/search/movie', {undefined, query});
    }
}

const getCategoriesPreview = async () => {
    const { data } = await api('/genre/movie/list', {
        params: {
            'language': lang,
        }
    });
    const categories = data.genres;

    printCategories(categories, categoriesPreviewList);
}

const getMovieDetail = async (movieId) => {
    const { data: movie } = await api(`/movie/${movieId}`);

    const movieImgUrl = `${POSTER_500W_URL}${movie.poster_path}`;
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

const getLikedMovies = () => {
    likedMoviesScroll.innerHTML = "";
    let likedMovies = Object.values(likedMovieList());
    printMoviePosters(likedMovies, likedMoviesScroll, true);
}