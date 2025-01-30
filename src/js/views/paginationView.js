import View from "./View.js";

class PaginationView extends View {
  holder = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this.holder.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest("a");

      if (!btn) return;

      const page = +btn.dataset.page;
      handler(page);
    });
  }

  generateMarkup() {
    const curPage = this.data.page;
    const numPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );

    // Many pages
    if (numPages > 1) {
      return `
        <li class="${
          curPage === 1 && numPages > 1 ? "disabled" : ""
        }"><a href="#" data-page='${
        curPage - 1
      }'><i class="icon-arrow-left"></i></a></li>
        <li>
            <div class="count-block">
                <span class="current-page">${curPage}</span>
                <span class="count-devider">of</span>
                <span class="total-page">${numPages}</span>
            </div>
        </li>
        <li class="${
          curPage === numPages && numPages > 1 ? "disabled" : ""
        }"><a href="#" data-page='${
        curPage + 1
      }'><i class="icon-arrow-right"></i></a></li>
      `;
    }
    // Only one page
    return "";
  }
}
export default new PaginationView();
