const scrollreveal = (window) => {
  window.ScrollReveal().reveal('.home-post-item', {
    delay: 100,
    interval: 16,
    reset: true
  });
  window.ScrollReveal().reveal('.main-content .post-content *');
  window.ScrollReveal().reveal('.post-donation', {
    interval: 16,
    reset: true
  });
  window.ScrollReveal().reveal('.post-copyright', {
    interval: 16,
    reset: true
  });
  window.ScrollReveal().reveal('.post-author-footer', {
    interval: 16,
    reset: true
  });
  window.ScrollReveal().reveal('.post-read-more-item', {
    interval: 16,
    reset: true
  });
};

export default scrollreveal(window);
