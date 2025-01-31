import reviewView from './reviewView.js';
import { DATA_AOS } from "../config.js";

class ResultsView extends reviewView {
  holder = document.querySelector('.results');
  errorMessage = 'No recipes found for your query! Please try again!';
  
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
  
  updateRecipeLinks() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('.recipe-link');

      if(!link) return;
      
      const recipes = document.querySelectorAll('.results .recipe-link');
      
      recipes.forEach(link => {
        link.classList.remove('active');
      })
      
      link.classList.add('active');
    })
  }
}
export default new ResultsView();
