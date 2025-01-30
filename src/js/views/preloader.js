class Preloader {
  holder = document.querySelector('.preloader');
  pathElements;
  drawingTime = null;

  init() {
    this.findElements();
    this.attachEvents();
  }

  attachEvents() {
    window.addEventListener('load', () => {
      this.drawSvg();
      this.addClass();
    });
  }

  findElements() {
    this.pathElements = this.holder.querySelectorAll('svg path');
    this.numElements = this.pathElements.length;
  }

  drawSvg() {
    this.pathElements.forEach((path, index) => {
      const pathLength = path.getTotalLength();

      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;
      path.style.stroke = 'none';

      this.drawingTime = Math.trunc(pathLength * 0.001);

      setTimeout(() => {
        path.style.animation = `draw ${this.drawingTime}s ease-in forwards`;
        path.style.stroke = 'black';
        path.style.strokeWidth = '5';

        this.addStyles(pathLength);
      }, this.drawingTime * index);
    });
  }

  addClass() {
    setTimeout(() => {
      const loader = document.querySelector('html.loader');

      if (loader) {
        document.querySelector('html.loader').classList.add('loaded');
      }
    }, this.drawingTime * this.numElements * 1000);
  }

  addStyles(value) {
    const style = document.createElement('style');

    style.innerHTML = `
        @keyframes draw {
            from {
                stroke-dashoffset: ${value};
            }
            to {
                stroke-dashoffset: 0;
            }
        }
    `;
    document.head.appendChild(style);
  }
}

export default new Preloader();
