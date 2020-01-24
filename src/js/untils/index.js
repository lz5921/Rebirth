/**
 * 是否在页面最顶部
 * @param $ jQuery 对象
 * @returns {boolean}
 */
export const isScrollTop = ($) => {
  return $(document).scrollTop() <= 0;
};

/**
 * 添加导航样式
 * @param $ jQuery 对象
 */
export const addTopNav = ($) => {
  $('.main-header').addClass('top-nav');
  $('.header-navbar').addClass('navbar-dark').removeClass('navbar-light');
};

/**
 * 添加导航样式
 * @param $ jQuery 对象
 */
export const removeTopNav = ($) => {
  $('.main-header').removeClass('top-nav');
  $('.header-navbar').removeClass('navbar-dark').addClass('navbar-light');
};
