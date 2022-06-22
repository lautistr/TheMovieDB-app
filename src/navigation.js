let maxPage;
let page = 1;
let infiniteScroll;
let lang = '';
let value = document.getElementById('lang-picker-select').value;
// let value = select.options[select.selectedIndex].value;
langPickerSelect.addEventListener('change', ()=>{console.log(value)});
console.log(value);

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
window.addEventListener('scroll', infiniteScroll, false);

function navigator() {
    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }

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

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    }
}

function homePage () {
    trendingMoviesPreviewList.innerHTML = "";

    headerSection.classList.remove('header-container--long');
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerUpperContainer.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    likedMoviesContainer.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    maxPageReached.classList.add('inactive');

    headerSection.style.background = '';

    getTrendingMoviesPreview();
    getCategoriesPreview();  
    getLikedMovies();  
}

function trendsPage () {
    genericSection.innerHTML = ""

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerUpperContainer.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    likedMoviesContainer.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    maxPageReached.classList.add('inactive');

    headerCategoryTitle.innerHTML = "Trending";
    getTrendingMovies();

    page = 1;
    infiniteScroll = getPaginatedTrendingMovies;
}

function searchPage () {
    genericSection.innerHTML = "";

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerUpperContainer.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    likedMoviesContainer.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    maxPageReached.classList.add('inactive');

    const [_, undecodedQuery] = location.hash.split('=');
    const query = decodeURI(undecodedQuery);
    getMoviesBySearch(query);

    page = 1;
    infiniteScroll = getPaginatedMoviesBySearch(query);
}

function movieDetailsPage () {
    headerSection.classList.add('header-container--long');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerUpperContainer.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    likedMoviesContainer.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('=');

    getMovieDetail(movieId);
}

function categoriesPage () {
    genericSection.innerHTML = "";

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerUpperContainer.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesContainer.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    maxPageReached.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    const decodedCategoryName = decodeURI(categoryName);

    headerCategoryTitle.innerHTML = decodedCategoryName;

    getMoviesByCategory(categoryId);

    page = 1;
    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

