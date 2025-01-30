import { IMG_PLACEHOLDER } from '../config.js';

export const checkImgUrl = (parent, img) => {
  const holder = document.querySelector(parent);
  const images = holder.querySelectorAll(img);

  const removeEventhandler = img => {
    img.removeEventListener('load', removeEventhandler);
  };

  images.forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', () => {
        removeEventhandler(img);
      });
      img.addEventListener('error', () => {
        img.src = IMG_PLACEHOLDER;
        removeEventhandler(img);
      });
    }
  });
};
