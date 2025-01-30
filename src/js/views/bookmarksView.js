import reviewView from "./reviewView.js";

class BookmarksView extends reviewView {
  holder = document.querySelector(".popup-bookmarks .popup-content");
  errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerDeleteBookmarks(handler) {
    this.holder.addEventListener("click", (e) => {
      e.preventDefault();
      const btn = e.target.closest(".btn-clear");
      if (!btn) return;
      handler();
      this.toggleBtnClass();
    });
  }

  toggleBtnClass() {
    const btnBookmark = document.querySelector(".recipe .btn-bookmark");

    if (!btnBookmark) return;
    btnBookmark.classList.toggle("bookmarked");
  }

  generateMarkup() {
    return `
      <h2>Your bookmarks</h2>
      ${this.data.map(this.generateMarkupPreview).join(" ")}
      <div class="btn-holder">
        <button class="btn btn-outline btn-clear">Delete all</button>     
      </div>
    `;
  }

  renderNumBookmarks(data) {
    const numHolder = document.querySelector(".open-bookmarks .num");
    numHolder.innerHTML = `${data.length ? data.length : ""}`;
  }
}
export default new BookmarksView();
