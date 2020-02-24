export const scrollreveal = (window) => {
  window.ScrollReveal().reveal('.home-post-item', {
    delay: 100,
    interval: 16,
    reset: true
  });
};

export default scrollreveal(window);
