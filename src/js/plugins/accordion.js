class Accordion {
  constructor() {
    this.holder;
    this.items;
    this.activeClass = 'active';
    this.hiddenClass = 'js-hidden';
    this.opener = '.opener';
    this.slide = '.slide';
    this.animSpeed = 300;
  }

  init(selector) {
    this.findElements(selector);
    this.hideSlides();
    this.attachEvents();
  }

  findElements(selector) {
    this.holder = document.querySelector(selector);
    this.items = this.holder.querySelectorAll(this.slide);
  }

  attachEvents() {
    this.holder.addEventListener('click', this.toggleSlide.bind(this));
  }

  hideSlides() {
    this.items.forEach(slider => slider.classList.add(this.hiddenClass));
  }

  toggleSlide(e) {
    e.preventDefault();
    const allOpeners = this.holder.querySelectorAll(this.opener);
    const opener = e.target.closest(this.opener);

    if (!opener) return;

    if (opener.parentElement.classList.contains(this.activeClass)) {
      allOpeners.forEach(opener => {
        opener.parentElement.classList.remove(this.activeClass);
        this.slideUp(opener.nextElementSibling);
      });
    } else {
      allOpeners.forEach(opener => {
        opener.parentElement.classList.remove(this.activeClass);
      });
      opener.parentElement.classList.add(this.activeClass);
      this.slideDown(opener.nextElementSibling);
      allOpeners.forEach(opener => {
        if (!opener.parentElement.classList.contains(this.activeClass)) {
          this.slideUp(opener.nextElementSibling);
        }
      });
    }
  }

  slideDown(slide) {
    slide.classList.remove(this.hiddenClass);

    let height = slide.offsetHeight;

    slide.style.overflow = 'hidden';
    slide.style.height = 0;
    slide.style.paddingTop = 0;
    slide.style.paddingBottom = 0;
    slide.offsetHeight;
    slide.style.transitionProperty = 'height, padding';
    slide.style.transitionDuration = this.animSpeed + 'ms';
    slide.style.height = height + 'px';
    slide.style.removeProperty('padding-top');
    slide.style.removeProperty('padding-bottom');
    window.setTimeout(() => {
      slide.style.removeProperty('height');
      slide.style.removeProperty('overflow');
      slide.style.removeProperty('transition-duration');
      slide.style.removeProperty('transition-property');
    }, this.animSpeed);
  }

  slideUp(slide) {
    slide.style.transitionProperty = 'height, padding';
    slide.style.transitionDuration = this.animSpeed + 'ms';
    slide.style.height = slide.offsetHeight + 'px';
    slide.offsetHeight;
    slide.style.overflow = 'hidden';
    slide.style.height = 0;
    slide.style.paddingTop = 0;
    slide.style.paddingBottom = 0;
    setTimeout(() => {
      slide.style.removeProperty('height');
      slide.style.removeProperty('padding-top');
      slide.style.removeProperty('padding-bottom');
      slide.style.removeProperty('overflow');
      slide.style.removeProperty('transition-duration');
      slide.style.removeProperty('transition-property');
      slide.classList.add(this.hiddenClass);
    }, this.animSpeed);
  }
}

export const accordion = new Accordion();
