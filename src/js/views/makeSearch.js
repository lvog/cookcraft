class MakeSearch {
  holder = document.querySelector(".search-form-block");
  searchOpener;
  form;
  formElements;
  formBtns;

  // Query
  queryName;
  diet;
  cuisine;
  calories;

  activeClass = "active";

  init() {
    this.findElements();
    this.attachEvents();
    this.checkRange();
  }

  findElements() {
    this.form = this.holder.querySelector(".search-form");
    this.formElements = this.form.querySelectorAll("input");
    this.formBtns = this.form.querySelectorAll(".btn");
    this.searchOpener = this.holder.querySelector(".search-form-block .opener");
  }

  attachEvents() {
    this.searchOpener.addEventListener("click", (e) => {
      e.preventDefault();

      this.holder.classList.contains(this.activeClass)
        ? this.closeSearch()
        : this.openSearch();
    });
    this.form.addEventListener("input", (e) => {
      const input = e.target.closest("input");
      if (!input) return;
      this.getSearchData();
      this.validateQuery();
    });
    this.form.addEventListener("reset", () => {
      this.clearQuery();
      this.validateQuery();
    });
  }

  openSearch() {
    document.body.style.cssText = "overflow-y: hidden";
    this.holder.classList.add(this.activeClass);
  }

  closeSearch() {
    document.body.removeAttribute("style");
    this.holder.classList.remove(this.activeClass);
  }

  addHandlerSearch(handler) {
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  getSearchData() {
    this.queryName = this.getSearchFieldValue();
    this.diet = this.getCheckedValues("diet");
    this.cuisine = this.getCheckedValues("cuisine");
    this.calories = this.getCaloriesValue();
  }

  validateQuery() {
    this.queryName ||
    this.diet.length > 0 ||
    this.cuisine.length > 0 ||
    +this.calories
      ? this.formBtns.forEach((btn) => btn.removeAttribute("disabled"))
      : this.formBtns.forEach((btn) => btn.setAttribute("disabled", ""));
  }

  clearQuery() {
    this.queryName = "";
    this.diet = [];
    this.cuisine = [];
    this.calories = 0;
  }

  getQuery() {
    return {
      queryName: this.queryName,
      diet: this.diet,
      cuisine: this.cuisine,
      calories: this.calories,
    };
  }

  getSearchFieldValue() {
    return this.form.querySelector(".search-field").value.toLowerCase();
  }

  getCheckedValues(category) {
    return [
      ...this.form.querySelectorAll(`[data-category="${category}"]:checked`),
    ].map((el) => el.value);
  }

  getCaloriesValue() {
    return this.form.querySelector("#calories").value;
  }

  checkRange() {
    const range = this.form.querySelector("#calories");
    const value = this.form.querySelector("#value");

    range.addEventListener("input", () => {
      value.innerHTML = range.value;
    });

    this.form.addEventListener("reset", () => {
      value.innerHTML = 0;
    });
  }

  clear() {
    this.form.reset();
  }
}

export default new MakeSearch();
