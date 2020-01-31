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
    $('body').addClass('overflow-hidden').append('<div class="modal-backdrop fade show global-modal"></div>');
    $('.sidebar-container').addClass('boxshadow-right');
  });
  // 移动端关闭侧边栏
  $('.sidebar-close').click(event => {
    $('.site-wrapper').toggleClass('toggled');
    $('.sidebar-toggler').show(250);
    $('body').removeClass('overflow-hidden');
    $('.sidebar-container').removeClass('boxshadow-right');
    $('.global-modal').remove();
  });
};

export default menu(window, window.jQuery);
