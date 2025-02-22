import * as model from "../model.js";

import { checkImgUrl } from "../helpers/checkImgUrl.js";

import resultsView from "../views/resultsView.js";
import paginationView from "../views/paginationView.js";

import makeSearch from "../views/makeSearch.js";
import calcMenu from "../views/calcMenu.js";

export const controlMenuResults = async function () {
  try {
    // Reset search
    makeSearch.clear();
    makeSearch.checkRange();

    // Get search query
    const query = calcMenu.calcResult();

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
  } catch (error) {
    console.log(error);

    // Render error message
    resultsView.renderError();
  }
};
