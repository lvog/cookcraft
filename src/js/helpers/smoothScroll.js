export const smoothScroll = selector => {
  const element = document.querySelector(selector);
  element.scrollIntoView({ behavior: 'smooth' });
};
