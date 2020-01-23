/**
 * 首页
 * @param window window对象
 * @param $ jQuery对象
 */
const postList = (window, $) => {
  // 移动端打开侧边栏
  $('.post-card-content-meta-authors-link').tooltip();
};

export default postList(window, window.jQuery);
