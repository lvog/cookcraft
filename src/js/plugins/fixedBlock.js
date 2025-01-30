import Headroom from "headroom.js";

class FixedBlock {
  constructor(holder, direction, headroom, destroyMediaQuery = null) {
    this.wrapper = document.querySelector(".wrapper");
    this.holder = holder;
    this.holderHeight;
    this.headroom = headroom;
    this.direction = direction;
    this.destroyMediaQuery = destroyMediaQuery;
    this.mediaQuery;
    this.flag;
  }

  init() {
    this.findElements(this.holder);
    this.setHeadroom();
    this.attachEvents();
  }

  findElements(selector) {
    this.holder = document.querySelector(selector);
    this.holderHeight = this.holder.offsetHeight;
    this.destroyMediaQuery
      ? (this.mediaQuery = `(max-width: ${this.destroyMediaQuery}px)`)
      : (this.mediaQuery = "");
  }

  setHeadroom() {
    if (!this.headroom) return;
    this.headroom = new Headroom(this.holder);
  }

  attachEvents() {
    ["resize", "load"].forEach((ev) =>
      window.addEventListener(ev, () => {
        this.mediaQuery
          ? (this.flag = window.matchMedia(this.mediaQuery).matches)
          : (this.flag = false);
        this.checkScreenRes();
      })
    );
  }

  checkScreenRes() {
    if (this.destroyMediaQuery) {
      if (this.flag) {
        this.addStyles();
        if (!this.headroom) return;
        this.headroom.init();
      } else {
        this.removeStyles();
        if (!this.headroom) return;
        // fix for hedroom
        if (!this.headroom.scrollTracker) {
          this.headroom.scrollTracker = {
            destroy: function () {},
          };
        }
        this.headroom.destroy();
      }
    } else {
      this.addStyles();
      if (!this.headroom) return;
      this.headroom.init();
    }
  }

  addStyles() {
    if (this.direction === "top") {
      this.wrapper.style.paddingTop = `${this.holderHeight}px`;
      this.holder.style.cssText = `position: fixed; top: 0; left: 0; right: 0; z-index: 999;`;
    } else {
      this.wrapper.style.paddingBottom = `${this.holderHeight}px`;
      this.holder.style.cssText = `position: fixed; bottom: 0; left: 0; right: 0; z-index: 999;`;
    }
  }

  removeStyles() {
    [this.wrapper, this.holder].forEach((el) => el.removeAttribute("style"));
  }
}

export const FixedBlockPlugin = {
  create: (holder, direction, headroom, destroyMediaQuery) =>
    new FixedBlock(holder, direction, headroom, destroyMediaQuery),
};
