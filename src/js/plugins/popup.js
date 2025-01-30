class Popup {
  constructor(popup, btnOpen) {
    this.holder = document.querySelector("body");
    this.popup = popup;
    this.btnOpen = btnOpen;
    this.btnCloseClass = ".btn-close";
    this.btnClose;
    this.activeClass = "popup-active";
  }

  init() {
    this.findElements(this.popup, this.btnOpen);
    this.hide();
    this.attachEvents();
  }

  findElements(popup, btnOpen) {
    this.popup = document.querySelector(popup);
    this.btnOpen = document.querySelector(btnOpen);
    this.btnClose = document.querySelector(this.btnCloseClass);
  }

  attachEvents() {
    this.btnOpen.addEventListener("click", (e) => this.showPopup(e));
    this.popup.addEventListener("click", (e) => this.hidePopup(e));
  }

  hide() {
    this.popup.style.cssText = "opacity: 0; visibility: hidden";
  }

  showPopup(e) {
    e.preventDefault();
    this.toggleClass();
    this.popup.style.cssText = "opacity: 1; visibility: visible";
  }

  hidePopup(e) {
    if (e.target.closest(this.btnCloseClass) || e.target === this.popup) {
      this.toggleClass();
      this.hide();
    }

    this.changeWindowHash(e);
  }

  toggleClass() {
    this.holder.classList.toggle(this.activeClass);
  }

  changeWindowHash(e) {
    const link = e.target.closest(".recipe-link");

    if (link) {
      window.location.hash = link.getAttribute("href");
      this.toggleClass();
      this.hide();
    }
  }
}

export const PopupPlugin = {
  create: (popup, btnOpen) => new Popup(popup, btnOpen),
};
