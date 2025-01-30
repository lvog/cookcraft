import { PopupPlugin } from "../plugins/popup.js";

const bookmarksPopup = PopupPlugin.create(
  ".popup-bookmarks",
  ".open-bookmarks"
);

export const menuPopup = PopupPlugin.create(".popup-menu", ".open-menu");

export const controlPopup = function () {
  bookmarksPopup.init();
  menuPopup.init();
};
