import View from "./View.js";
import { DATA_AOS } from "../config.js";

export default class ReviewView extends View {
  holder = "";
  welcomeBlock = document.querySelector(".welcome-block");

  generateMarkup() {
    this.removeBlock();

    return `${this.data.map(this.generateMarkupPreview).join(" ")}`;
  }

  generateMarkupPreview(res) {
    const id = +window.location.hash.slice(1);

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
