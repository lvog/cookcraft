import AOS from "aos";

// Helpers
import ready from "./helpers/checkDOM.js";
import "./helpers/resizeHandler.js";

// Components
import preloader from "./views/preloader.js";
import makeSearch from "./views/makeSearch.js";
import calcMenu from "./views/calcMenu.js";

// Views
import recipeView from "./views/recipeView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

// Controllers
import { controlRecipes } from "./controllers/controlRecipes.js";
import { controlSearchResults } from "./controllers/controlSearchResults.js";
import {
  controlAddBookmark,
  controlDeleteBookmarks,
  controlBookmarks,
} from "./controllers/controlBookmarks.js";
import { controlPagination } from "./controllers/controlPagination.js";
import { controlMenuResults } from "./controllers/controlMenuResults.js";
import { controlFixedBlock } from "./controllers/controlFixedBlock.js";
import { controlPopup } from "./controllers/controlPopup.js";
import { controlSearchQuery } from "./controllers/controlSearchQuery.js";
import resultsView from "./views/resultsView.js";

ready(() => {
  AOS.init();
  preloader.init();
  makeSearch.init();
  makeSearch.addHandlerSearch(controlSearchResults);
  calcMenu.init();
  calcMenu.addHandlerClick(controlMenuResults);
  controlFixedBlock();
  controlPopup();
  controlSearchQuery();
  resultsView.updateRecipeLinks();
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addHandlerRender(controlBookmarks);
  bookmarksView.addHandlerDeleteBookmarks(controlDeleteBookmarks);
  paginationView.addHandlerClick(controlPagination);
})
