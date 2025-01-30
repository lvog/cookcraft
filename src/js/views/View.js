import { DATA_AOS } from "../config.js";

export default class View {
  data;
  query;

  render(data, query = "null") {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this.data = data;
    this.query = query;
    const markup = this.generateMarkup();
    this.clear();
    this.add(markup);
  }

  clear() {
    this.holder.innerHTML = "";
  }

  add(markup) {
    this.holder.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
          <i class="icon-spinner"></i>
      </div>
    `;
    this.clear();
    this.holder.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this.errorMessage) {
    const markup = `
          <div class="message error" data-aos="${DATA_AOS.animation}" data-aos-duration="${DATA_AOS.duration}" data-aos-easing="${DATA_AOS.easing}" data-aos-once="${DATA_AOS.once}">
            <i class="icon-error"></i>
            <p>${message}</p>
          </div>
        `;
    this.clear();
    this.add(markup);
  }
}
