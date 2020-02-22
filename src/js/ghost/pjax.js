import {tooltip} from '../global/tooltip';
import {popover} from '../global/popover';
import {toc} from '../post/content-toc';
import {prism} from '../post/prism';
import {contentProgress} from '../post/content-progress';
import {imageZoomDefault} from '../post/imageZoom';
import {share} from '../post/share';
import {comment} from '../ghost/comment';
import {templateLinks} from '../ghost/template-links';
import {homeSentence} from '../ghost/home-sentence';

/**
 * 查找 jQuery 对象
 * @param elems element 对象
 * @param selector css 选择器
 * @returns {*}
 */
const findAll = (elems, selector) => {
  return elems.filter(selector).add(elems.find(selector));
};

/**
 * 元素替换
 * @param ele
 * @param elements
 * @param $
 * @returns {jQuery}
 */
const replace = (ele, elements, $) => {
  const find = findAll(elements, ele);
  if (find.length !== 0) {
    $(ele).replaceWith(findAll(elements, ele));
  } else {
    // 如果空节点内容为空，不能删除
    $(ele).html(null);
  }
};

const pjax = (window) => {
  const $ = window.jQuery;
  const document = window.document;
  $('body').on('click', 'a[data-pjax]', function (event) {
    // 阻止默认事件
    event.preventDefault();
    // 执行加载动画
    $('body').addClass('overflow-hidden');
    $('.pjax-loading-wrapper').fadeIn();
    // 获取链接地址
    const url = $(this).attr('href');
    // 请求数据
    setTimeout(() => {
      $.ajax({
        type: 'GET',
        url: url,
        success: function (response) {
          const $head = $($.parseHTML(response.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]));
          const $body = $($.parseHTML(response.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
          // 设置标题
          document.title = findAll($head, 'title').text();
          // 返回头部
          $(window).scrollTop(0);
          // 替换内容
          replace('.main-hero', $body, $);
          replace('.main-content', $body, $);
          // 个性化配置 - 菜单激活 Top
          if ($(event.target).hasClass('top-menu-nav-item')) {
            $('.navbar-nav .nav-current.active').removeClass('nav-current active');
            $(event.target).parent().addClass('nav-current active');
          }
          // 个性化配置 - 菜单激活移动端 Side
          if ($(event.target).hasClass('side-menu-nav-item')) {
            $('.side-navbar-nav .nav-current.active').removeClass('nav-current active');
            $(event.target).addClass('nav-current active');
            // 关闭侧边栏
            $('.site-wrapper').toggleClass('toggled');
            $('.sidebar-toggler').show(250);
            $('body').removeClass('overflow-hidden');
            $('.sidebar-container').removeClass('boxshadow-right');
            $('.global-modal').remove();
          }
          // 个性化配置 - 搜索打开链接
          if ($(event.currentTarget).hasClass('ghost-search-item')) {
            const body = $('body');
            body.removeClass('overflow-hidden');
            // 移除搜索界面隐藏样式
            $('.search-wrapper').hide(250);
            // 移除全局遮罩层
            $('.global-modal-pc-search').remove();
            // 清空搜索结果
            $('#ghost-search-field').val('');
            $('#ghost-search-results').html('');
            $('.search-meta[data-no-results-text]').text('有 0 篇文章');
            if (body.hasClass('mobile-content')) {
              $('.site-wrapper').toggleClass('toggled');
              $('.sidebar-toggler').show(250);
              $('body').removeClass('overflow-hidden');
              $('.sidebar-container').removeClass('boxshadow-right');
              $('.global-modal').remove();
            }
          }
          // 个性化配置 - 阅读进度条
          const progress = findAll($body, '.site-progress');
          if (progress.length !== 0) {
            $('.main-wrapper').prepend(findAll($body, '.site-progress'));
            contentProgress(window);
          } else {
            $('.site-progress').remove();
          }
          // 事件回调
          toc(window);
          prism(window);
          imageZoomDefault(window);
          tooltip(window);
          popover(window);
          share(window);
          templateLinks(window);
          homeSentence(window);
          comment();
          // 重置 ToolTips
          $('.site-tooltip-wrapper').remove();
          // 写入浏览器历史记录
          window.history.pushState(null, '', url);
          // 执行关闭动画
          $('body').removeClass('overflow-hidden');
          $('.pjax-loading-wrapper').fadeOut('slow');
        }
      });
    }, 500);
  });
};

export default pjax(window);
