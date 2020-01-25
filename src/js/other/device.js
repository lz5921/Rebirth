import { debounce } from '../untils';

function getInnerWidth($) {
  const width = window.innerWidth;
  if (width <= 576) {
    $('.post-content').addClass('mobile-content').removeClass('tablet-content', 'desktop-content');
  }
  if (width > 576 && width < 1200) {
    $('.post-content').addClass('tablet-content').removeClass('mobile-content', 'desktop-content');
  }
  if (width >= 1200) {
    $('.post-content').addClass('desktop-content').removeClass('tablet-content', 'mobile-content');
  }
}

const debounceWidth = debounce(() => {
  getInnerWidth(window.jQuery);
}, 100);

const device = ($) => {
  getInnerWidth($);
  addEventListener('resize', (event) => {
    debounceWidth($);
  });
};

export default device(window.jQuery);
