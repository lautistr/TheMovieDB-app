searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
  });
  
trendingBtn.addEventListener('click', () => {
location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
    const stateLoad = window.history.state ? window.history.state.loadUrl : '';
    if (stateLoad.includes('#')) {
        window.location.hash = '';
    } else {
        window.history.back();
    }
});

window.addEventListener(
    'DOMContentLoaded',
    () => {
        navigator();
        window.history.pushState({ loadUrl: window.location.href }, null, '');
    },
    false,
);
window.addEventListener('DOMContentloaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });

    location.hash.startsWith('#trends')
    ? trendsPage()       :
    location.hash.startsWith('#search=')
    ? searchPage()       :
    location.hash.startsWith('#movie=')
    ? movieDetailsPage() :
    location.hash.startsWith('#category=')
    ? categoriesPage()   :
    homePage()

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage () {
    console.log ('HOME!')

    headerSection.classList.remove('header-container--long');
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    headerSection.style.background = '';

    getTrendingMoviesPreview();
    getCategoriesPreview();    
}

function trendsPage () {
    console.log ('TRENDS!')

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = "Trending";
    getTrendingMovies();
}

function searchPage () {
    console.log ('search!')

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, undecodedQuery] = location.hash.split('=');
    const query = decodeURI(undecodedQuery);
    getMoviesBySearch(query);
}

function movieDetailsPage () {
    console.log ('details!')

    headerSection.classList.add('header-container--long');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('=');

    getMovieDetail(movieId);
}

function categoriesPage () {
    console.log ('categories!')

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    const decodedCategoryName = decodeURI(categoryName);

    headerCategoryTitle.innerHTML = decodedCategoryName;

    getMoviesByCategory(categoryId);
}

