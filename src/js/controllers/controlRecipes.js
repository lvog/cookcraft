import * as model from "../model.js";

import { checkImgUrl } from "../helpers/checkImgUrl.js";
import { smoothScroll } from "../helpers/smoothScroll.js";

import resultsView from "../views/resultsView.js";
import recipeView from "../views/recipeView.js";
import bookmarksView from "../views/bookmarksView.js";

import makeSearch from "../views/makeSearch.js";
import { accordion } from "../plugins/accordion.js";

export const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    const query = model.state.search.query;

    if (!id) return;

    // Update results view to mark selected search results
    query.length
      ? resultsView.render(model.getSearchResultsPage(), query)
      : makeSearch.clear();

    bookmarksView.render(model.state.bookmarks);
    bookmarksView.renderNumBookmarks(model.state.bookmarks);

    // Check images (search results)
    checkImgUrl(".results", ".main-img");

    // Check images (popup-bookmarks)
    checkImgUrl(".popup-bookmarks", ".main-img");

    // Render spinner before load search results
    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Check image (recipe)
    checkImgUrl(".recipe-holder", ".main-img");

    // Smooth scroll to recipe block
    smoothScroll(".recipe");

    // Init accordion
    accordion.init(".accordion");
  } catch (error) {
    console.log(error);

    // Render error message
    recipeView.renderError();
  }
};
