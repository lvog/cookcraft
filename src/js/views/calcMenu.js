import { menuPopup } from "../controllers/controlPopup.js";

class CalcMenu {
  // Form Elements
  holder = document.querySelector(".calc-form");
  inputs = document.querySelectorAll(".calc-form input");
  sex;
  height;
  weight;
  age;
  activity;
  validate = false;

  // Slider Elements
  slider = {
    track: document.querySelector(".slider-track"),
    slides: document.querySelectorAll(".slider-slide"),
    btnPrev: document.querySelector(".slider-nav .btn-prev"),
    btnNext: document.querySelector(".slider-nav .btn-next"),
    disadledClass: "disabled",
  };

  init() {
    this.findElements();
    this.setSlider();
    this.attachEvents();
  }

  findElements() {
    this.slider.maxSlides = this.slider.slides.length;
    this.slider.slideWidth = this.slider.track.offsetWidth;
  }

  attachEvents() {
    this.slider.btnPrev.addEventListener("click", (e) =>
      this.moveSlide(e, "prev")
    );
    this.slider.btnNext.addEventListener("click", (e) =>
      this.moveSlide(e, "next")
    );
    this.inputs.forEach((input) => {
      input.addEventListener("change", this.validateData.bind(this));
      input.addEventListener("input", this.validateData.bind(this));
    });

    this.holder.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.keyCode === 13) {
        e.preventDefault();
      }
    });
  }

  addHandlerClick(handler) {
    this.holder.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
      e.target.reset();
    });
  }

  validateData(e) {
    e.preventDefault();
    const { name, value, type } = e.target;
    const parent = e.target.closest(".form-block");

    if (type === "number") {
      const valueNum = +value;
      const { min, max } = e.target;

      if (valueNum >= +min && valueNum <= +max) {
        parent.classList.remove("error");
        this.validate = true;
        this.takeData(name, value);
      } else {
        parent.classList.add("error");
        this.validate = false;
      }
    } else if (value) {
      parent.classList.remove("error");
      this.validate = true;
      this.takeData(name, value);
    }

    this.toggleClass();
    this.checkCurSlide();

    if (name === "activity") {
      this.holder
        .querySelector(".btn-submit")
        .classList.remove(this.slider.disadledClass);
    }
  }

  calcResult() {
    const { sex, weight, height, age, activity } = this;
    const baseCalc = (base, weight, height, age, activity) =>
      Math.round((base + 13.4 * weight + 4.8 * height - 5.7 * age) * activity);
    let result;

    if (sex === "male") {
      result = baseCalc(88.36, weight, height, age, activity);
    } else {
      result = baseCalc(447.6, weight, height, age, activity);
    }

    menuPopup.hide();
    menuPopup.toggleClass();
    setTimeout(() => {
      this.setSlider();
    }, 1000);

    return result;
  }

  takeData(name, value) {
    switch (name) {
      case "sex":
        this.sex = value;
        break;
      case "age":
        this.age = +value;
        break;
      case "height":
        this.height = +value;
        break;
      case "weight":
        this.weight = +value;
        break;
      case "activity":
        this.activity = +value;
        break;
      default:
        console.log("Error");
        break;
    }
  }

  setSlider() {
    this.slider.curSlide = 0;
    this.slider.slides.forEach(
      (slide) => (slide.style.width = `${this.slider.slideWidth}px`)
    );
    this.slider.track.style.width = `${
      this.slider.slideWidth * this.slider.maxSlides
    }px`;
    this.moveToSlide(this.slider.curSlide);
  }

  moveToSlide(num) {
    this.slider.track.style.transform = `translate3d(${
      -this.slider.slideWidth * num
    }px, 0, 0)`;
    this.checkData();
    this.checkCurSlide();
  }

  moveSlide(e, direction) {
    e.preventDefault();
    this.slider.curSlide =
      direction === "next"
        ? this.slider.curSlide + 1
        : this.slider.curSlide - 1;
    this.moveToSlide(this.slider.curSlide);
  }

  checkCurSlide() {
    if (this.slider.curSlide === this.slider.maxSlides - 1) {
      this.slider.btnNext.classList.add(this.slider.disadledClass);
    }

    this.slider.curSlide === 0
      ? this.slider.btnPrev.classList.add(this.slider.disadledClass)
      : this.slider.btnPrev.classList.remove(this.slider.disadledClass);
  }

  toggleClass() {
    this.validate
      ? this.slider.btnNext.classList.remove(this.slider.disadledClass)
      : this.slider.btnNext.classList.add(this.slider.disadledClass);
  }

  checkData() {
    const curEl = this.slider.slides[this.slider.curSlide];
    const elements = curEl.querySelectorAll("input");
    const checkedEl = [...elements].filter((el) => el.checked);

    if (checkedEl.length > 0) {
      this.validate = true;
      if (checkedEl[0].name === "activity") {
        this.holder
          .querySelector(".btn-submit")
          .classList.remove(this.slider.disabledClass);
      }
    } else {
      const value = +elements[0].value;
      const { min, max } = elements[0];
      this.validate = value >= +min && value <= +max;
    }

    this.toggleClass();
  }
}

export default new CalcMenu();
