const BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_300W_URL = 'https://image.tmdb.org/t/p/w300';

const getTrendingMoviesPreview = async () => {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();
    const movies = data.results;

    const trendingPreviewMovieContainer = document.querySelector
        ('#trendingPreview .trendingPreview-movieList');

    movies.forEach(movie => {


        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            `${POSTER_300W_URL}${movie.poster_path}`
        );

        movieContainer.appendChild(movieImg);
        trendingPreviewMovieContainer.appendChild(movieContainer);

    });
}
const getCategoriesPreview = async () => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();
    const categories = data.genres;

    const categoriesPreviewContainer = document.querySelector
        ('#categoriesPreview .categoriesPreview-list');

    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute(
            'id',
            `id${category.id}`
        );
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewContainer.appendChild(categoryContainer);

    });
}

getTrendingMoviesPreview();
getCategoriesPreview();