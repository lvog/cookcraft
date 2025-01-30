import View from "./View.js";
import { DATA_AOS } from "../config.js";

class RecipeView extends View {
  holder = document.querySelector(".recipe");
  errorMessage = "We could not find that recipe. Please try another one!";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerAddBookmark(handler) {
    this.holder.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-bookmark");

      if (!btn) return;

      btn.classList.toggle("bookmarked");
      handler();
    });
  }

  generateMarkup() {
    return `
      <div class="recipe-holder" data-aos="${
        DATA_AOS.animation
      }" data-aos-duration="${DATA_AOS.duration}" data-aos-easing="${
      DATA_AOS.easing
    }" data-aos-once="${DATA_AOS.once}">
        <div class="img-block bg-img">
          <img class="main-img" src="${this.data.image}" alt="${
      this.data.title
    }" />
          ${this.generateMarkupDiets()}
        </div>
        <div class="text-block">
          <h1>${this.data.title}</h1>
          <div class="recipe-info">
            <ul class="info-list">
              ${
                this.data.servings
                  ? `<li>
              <i class="icon-people"></i>${this.data.servings} ${
                      this.data.servings > 1 ? "people" : "person"
                    }</li>`
                  : ""
              }
              ${
                this.data.cookingTime
                  ? `<li><i class="icon-time"></i>${this.data.cookingTime} min</li>`
                  : ""
              }
            </ul>
            <button class="btn-bookmark ${
              this.data.bookmarked ? "bookmarked" : ""
            }"><i class="icon-bookmark-o"></i></button>
          </div>
          <ul class="accordion">
              <li>
                  <a class="opener" href="#">Description <span class="icon"></span></a>
                  <div class="slide">
                    <p>${this.data.summary}</p>
                  </div>
              </li>
              <li>
                  <a class="opener" href="#">Instruction <span class="icon"></span></a>
                  <div class="slide">
                      <ol>
                        ${this.data.instructions
                          .map(this.generateMarkupInstruction)
                          .join(" ")}
                      </ol>
                  </div>
              </li>
              <li>
                  <a class="opener" href="#">Ingredients <span class="icon"></span></a>
                  <div class="slide">
                      <ul>
                      ${this.data.ingredients
                        .map(this.generateMarkupIngredient)
                        .join(" ")}
                      </ul>
                  </div>
              </li>
              <li>
                  <a class="opener" href="#">Nutritionals <span class="icon"></span></a>
                  <div class="slide">
                      <table>
                          <tr>
                              <th>Name</th>
                              <th>Amount</th>
                              <th>Percent of daily needs</th>
                          </tr>
                          ${this.data.nutrition
                            .map(this.generateMarkupNutrition)
                            .join(" ")}
                      </table>
                  </div>
              </li>
          </ul>
        </div>
        <div class="author-block">
          <p>If any information is missing from this recipe, please visit the link to the original author for more details.</p>
          <a href="${
            this.data.sourceUrl
          }" class="btn" target="_blank">Find more</a>
        </div>
      </div>
`;
  }

  generateMarkupIngredient(ing) {
    return `
        <li>${ing.original}</li>
    `;
  }

  generateMarkupInstruction(inst) {
    return `
      <li>${inst.step}</li>
    `;
  }

  generateMarkupDiets() {
    if (this.data.vegetarian || this.data.glutenFree || this.data.dairyFree) {
      return `
        <ul class="diets-list">
          ${this.data.vegetarian ? `<li><i class="icon-vegan"></i></li>` : ""}
          ${
            this.data.glutenFree
              ? `<li><i class="icon-gluten-free"></i></li>`
              : ""
          }
          ${
            this.data.dairyFree
              ? `<li><i class="icon-dairy-free"></i></li>`
              : ""
          } 
        </ul>
      `;
    }
  }

  generateMarkupNutrition(nut) {
    return `
        <tr>
            <th>${nut.name}</th>
            <td>${nut.amount} ${nut.unit}</td>
            <td>${nut.percentOfDailyNeeds}%</td>
        </tr>
    `;
  }
}

export default new RecipeView();
