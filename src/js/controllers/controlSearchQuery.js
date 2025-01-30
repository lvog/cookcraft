import * as model from "../model.js";

import makeSearch from "../views/makeSearch.js";

export const controlSearchQuery = function () {
  const query = model.state.search.query;

  if (query.length > 0) return;
  makeSearch.clear();
};
