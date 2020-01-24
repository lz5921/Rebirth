/**
 * 菜单业务
 * @param window window对象
 * @param $ jQuery对象
 */
const menu = (window, $) => {
  // 移动端打开侧边栏
  $('.sidebar-toggler').click(event => {
    $('.site-wrapper').toggleClass('toggled');
    $(event.currentTarget).hide(250);
    $('body').addClass('overflow-hidden');
    $('.sidebar-container').addClass('border-right');
  });
  // 移动端关闭侧边栏
  $('.sidebar-close').click(event => {
    $('.site-wrapper').toggleClass('toggled');
    $('.sidebar-toggler').show(250);
    $('body').removeClass('overflow-hidden');
    $('.sidebar-container').removeClass('border-right');
  });
};

export default menu(window, window.jQuery);
