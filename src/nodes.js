const $ = (id) => document.querySelector(id);

// Sections
const headerSection = $('#header');
const trendingPreviewSection = $('#trendingPreview');
const categoriesPreviewSection = $('#categoriesPreview');
const genericSection = $('#genericList');
const movieDetailSection = $('#movieDetail');

// Lists & Containers
const searchForm = $('#searchForm');
const trendingMoviesPreviewList = $('.trendingPreview-movieList');
const categoriesPreviewList = $('.categoriesPreview-list');
const movieDetailCategoriesList = $('#movieDetail .categories-list');
const movieContainer = $('.movie-container');
const relatedMoviesContainer = $('.relatedMovies-scrollContainer');
const likedMoviesContainer = $('#liked');
const likedMoviesScroll = $('.liked-movieList');
const headerUpperContainer = $('.header-home-upper-row');

// Elements
const headerTitle = $('.header-title');
const arrowBtn = $('.header-arrow');
const headerCategoryTitle = $('.header-title--categoryView');

const searchFormInput = $('#searchForm input');
const searchFormBtn = $('#searchBtn');
const langPickerSelect = $('#lang-picker-select')

const trendingBtn = $('.trendingPreview-btn');

const movieDetailTitle = $('.movieDetail-title');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailScore = $('.movieDetail-score');
const maxPageReached = $('#max-page');