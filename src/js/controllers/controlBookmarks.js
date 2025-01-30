import * as model from "../model.js";
import { checkImgUrl } from "../helpers/checkImgUrl.js";
import bookmarksView from "../views/bookmarksView.js";

export const controlAddBookmark = function () {
  // Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
  bookmarksView.renderNumBookmarks(model.state.bookmarks);

  // Check images (popup-bookmarks)
  checkImgUrl(".popup-bookmarks", ".main-img");
};

export const controlDeleteBookmarks = function () {
  // Clear bookmarks (localStorage)
  model.clearBookmarks();

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
  bookmarksView.renderNumBookmarks(model.state.bookmarks);

  // Check images (popup-bookmarks)
  checkImgUrl(".popup-bookmarks", ".main-img");
};

export const controlBookmarks = function () {
  // Restore bookmarks (localStorage)
  model.restoreBookmarks();

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
  bookmarksView.renderNumBookmarks(model.state.bookmarks);

  // Check images (popup-bookmarks)
  checkImgUrl(".popup-bookmarks", ".main-img");
};
