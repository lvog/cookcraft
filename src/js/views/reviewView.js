import View from "./View.js";
import { DATA_AOS } from "../config.js";

export default class ReviewView extends View {
  holder = "";
  welcomeBlock = document.querySelector(".welcome-block");

  renderSearchTitle(query) {
    this.query = query;
    this.removeSearchTitle();
    this.addSearchTitle();
  }

  addSearchTitle() {
    const holder = document.querySelector(".main-info");
    const title = document.createElement("div");
    title.classList.add("heading-block");

    const markup = `
      <h2 data-aos="${DATA_AOS.animation}" 
          data-aos-duration="${DATA_AOS.duration}" 
          data-aos-easing="${DATA_AOS.easing}" 
          data-aos-once="${DATA_AOS.once}">
          Search results for <span class="query">${this.createSearchMessage()}</span>
      </h2>
    `;

    title.innerHTML = markup;
    holder.insertAdjacentElement("afterbegin", title);
  }

  removeSearchTitle() {
    const title = document.querySelector(".heading-block");
    if (title) title.remove();
  }

  createSearchMessage() {
    let queryName, diet, cuisine, calories;

    if (typeof this.query !== "number") {
      ({ queryName, diet, cuisine, calories } = this.query);
      queryName = queryName ? `${queryName}` : "";
      calories = calories > 0 ? `${calories}kcal` : "";
      diet = diet.join(", ");
      cuisine = cuisine.join(", ");
    } else {
      queryName = this.query;
    }

    return typeof queryName === "number"
      ? `${queryName} kcal menu`
      : `${queryName} ${diet} ${cuisine} ${calories}`;
  }

  generateMarkup() {
    this.removeBlock();

    return `${this.data.map(this.generateMarkupPreview).join(" ")}`;
  }

  generateMarkupPreview(res) {
    const id = +window.location.hash.slice(1);
    console.log(res.id, id);

    return `
    <article class="recipe-block" data-aos="${
      DATA_AOS.animation
    }" data-aos-duration="${DATA_AOS.duration}" data-aos-easing="${
      DATA_AOS.easing
    }" data-aos-once="${DATA_AOS.once}" >
      <a href="#${res.id}" class="recipe-link ${res.id === id ? "active" : ""}">
        ${
          res.image
            ? `<div class="img-block bg-img"><img class="main-img" src="${res.image}" alt="${res.title}" /></div>`
            : ``
        }
        <div class="text-block">
          <h3>${res.title}</h3>
        </div>    
      </a>
    </article>
    `;
  }

  removeBlock() {
    if (!this.welcomeBlock) return;
    this.welcomeBlock.remove();
  }
}
