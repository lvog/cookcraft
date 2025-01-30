import * as model from "../model.js";

import { checkImgUrl } from "../helpers/checkImgUrl";

import resultsView from "../views/resultsView.js";
import paginationView from "../views/paginationView.js";

export const controlPagination = function (page) {
  // Set query
  const query = model.state.search.query;

  // Render NEW result
  resultsView.render(model.getSearchResultsPage(page), query);

  // Check images (search results)
  checkImgUrl(".results", ".main-img");

  // Render NEW pagination
  paginationView.render(model.state.search);
};
