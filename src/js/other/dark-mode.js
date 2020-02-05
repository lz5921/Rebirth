import {loadStyles} from '../untils';

const darkMode = (window, $) => {
  const lightCss = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.0/build/styles/default.min.css';
  const darkCss = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.0/build/styles/tomorrow-night-bright.min.css';
  let getColorMode = null;
  // 初始化页面
  setTimeout(() => {
    getColorMode = window.sessionStorage.colorMode ? window.sessionStorage.colorMode.trim() : getComputedStyle(document.documentElement).getPropertyValue('--color-content').trim();
    if (getColorMode === 'dark') {
      window.$('.click-dark').remove();
      window.document.documentElement.setAttribute('data-theme', 'dark');
      loadStyles([{
        url: darkCss,
        id: 'highlight-css'
      }]);
    } else {
      window.document.documentElement.setAttribute('data-theme', 'light');
      loadStyles([{
        url: lightCss,
        id: 'highlight-css'
      }]);
    }
  }, 0);
  // 手动切换
  $('.click-dark').click((event) => {
    getColorMode = getComputedStyle(document.documentElement).getPropertyValue('--color-content').trim();
    $('#highlight-css').remove();
    if (getColorMode === 'dark') {
      window.sessionStorage.setItem('colorMode', 'light');
      window.document.documentElement.setAttribute('data-theme', 'light');
      window.document.documentElement.style.setProperty('--color-content', 'light');
      loadStyles([{
        url: lightCss,
        id: 'highlight-css'
      }]);
    } else {
      window.sessionStorage.setItem('colorMode', 'dark');
      window.document.documentElement.setAttribute('data-theme', 'dark');
      window.document.documentElement.style.setProperty('--color-content', 'dark');
      loadStyles([{
        url: darkCss,
        id: 'highlight-css'
      }]);
    }
  });
};

export default darkMode(window, window.jQuery);
