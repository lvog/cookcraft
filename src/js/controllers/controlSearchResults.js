import * as model from "../model.js";

import { checkImgUrl } from "../helpers/checkImgUrl.js";
import { smoothScroll } from "../helpers/smoothScroll.js";

import resultsView from "../views/resultsView.js";
import paginationView from "../views/paginationView.js";

import makeSearch from "../views/makeSearch.js";

export const controlSearchResults = async function () {
  try {
    // Get search query
    const query = makeSearch.getQuery();

    if (!query) return;

    // Render spinner before load search results
    resultsView.renderSpinner();

    // Load search results
    await model.loadSearchResults(query);

    // Add search title
    resultsView.renderSearchTitle(query);

    // Render result
    resultsView.render(model.getSearchResultsPage(), query);

    // Check images (search results)
    checkImgUrl(".results", ".main-img");

    // Render pagination
    paginationView.render(model.state.search);

    // Close search
    makeSearch.closeSearch();

    // Smooth scroll to wrapper
    smoothScroll(".wrapper");
  } catch (error) {
    console.log(error);

    // Render error message
    resultsView.renderError();
  }
};
