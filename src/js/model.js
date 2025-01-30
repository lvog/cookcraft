import { API_URL, API_KEY, RES_PER_PAGE } from './config.js';
import { makeRequest } from './helpers/makeRequest.js';

export const state = {
  search: {
    query: {},
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  recipe: {},
  bookmarks: [],
};

const createSearchQuery = function (query) {
  return {
    queryName: query.queryName,
    diet: query.diet,
    cuisine: query.cuisine,
    calories: query.calories,
  };
};

const createRecipeObj = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    vegetarian: recipe.vegetarian,
    glutenFree: recipe.glutenFree,
    dairyFree: recipe.dairyFree,
    servings: recipe.servings,
    cookingTime: recipe.readyInMinutes,
    summary: recipe.summary,
    instructions: recipe.analyzedInstructions[0].steps,
    ingredients: recipe.extendedIngredients,
    nutrition: recipe.nutrition.nutrients,
    sourceUrl: recipe.sourceUrl,
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await makeRequest(
      `${API_URL}recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`
    );

    state.recipe = createRecipeObj(data);

    if (state.bookmarks.some(bookmark => bookmark.id === +id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkRequest = function (name, value) {
  let query = value;
  if (query.length > 0) {
    query = query.join(',');
    return `&${name}=${query}`;
  } else {
    return '';
  }
};

export const loadSearchResults = async function (query) {
  try {
    let queryName, diet, cuisine, calories;

    if (typeof query !== 'number') {
      state.search.query = createSearchQuery(query);
      ({ queryName, diet, cuisine, calories } = state.search.query);

      queryName = queryName ? `&query=${queryName}` : '';
      calories = calories > 0 ? `&maxCalories=${calories}` : '';
      diet = checkRequest('diet', diet);
      cuisine = checkRequest('cuisine', cuisine);
    } else {
      state.search.query = query;
      queryName = query;
    }

    const request =
      typeof queryName !== 'number'
        ? `${API_URL}recipes/complexSearch?apiKey=${API_KEY}${queryName}${diet}${cuisine}${calories}&number=100`
        : `${API_URL}mealplanner/generate?apiKey=${API_KEY}&timeFrame=day&targetCalories=${queryName}`;

    const data = await makeRequest(`${request}`);
    const res = typeof queryName !== 'number' ? data.results : data.meals;

    state.search.results = res.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

const storeBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const restoreBookmarks = function () {
  const storage = localStorage.getItem('bookmarks');

  if (storage) state.bookmarks = JSON.parse(storage);
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;

  storeBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const filterArr = state.bookmarks.filter(bookmark => bookmark.id !== id);
  state.bookmarks = filterArr;

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  storeBookmarks();
};

export const clearBookmarks = function () {
  localStorage.clear('bookmarks');
  state.bookmarks = [];
  state.recipe.bookmarked = false;
};
