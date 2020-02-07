import {loadStyles} from '../untils';

const darkMode = (window, $) => {
  const codeBlocks = window.document.querySelectorAll('.post-content pre>code');
  const lightCss = 'https://cdn.jsdelivr.net/npm/prismjs@1.19.0/themes/prism.min.css';
  const darkCss = 'https://cdn.jsdelivr.net/npm/prismjs@1.19.0/themes/prism-tomorrow.min.css';
  let getColorMode = null;
  // 初始化页面
  setTimeout(() => {
    getColorMode = window.sessionStorage.colorMode ? window.sessionStorage.colorMode.trim() : getComputedStyle(document.documentElement).getPropertyValue('--color-content').trim();
    if (getColorMode === 'dark') {
      window.$('.click-dark').remove();
      window.document.documentElement.setAttribute('data-theme', 'dark');
      if (codeBlocks.length !== 0) {
        loadStyles([{
          url: darkCss,
          id: 'prism-css'
        }]);
      }
    } else {
      window.document.documentElement.setAttribute('data-theme', 'light');
      if (codeBlocks.length !== 0) {
        loadStyles([{
          url: lightCss,
          id: 'prism-css'
        }]);
      }
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
      if (codeBlocks.length !== 0) {
        loadStyles([{
          url: lightCss,
          id: 'prism-css'
        }]);
      }
    } else {
      window.sessionStorage.setItem('colorMode', 'dark');
      window.document.documentElement.setAttribute('data-theme', 'dark');
      window.document.documentElement.style.setProperty('--color-content', 'dark');
      if (codeBlocks.length !== 0) {
        loadStyles([{
          url: darkCss,
          id: 'prism-css'
        }]);
      }
    }
  });
};

export default darkMode(window, window.jQuery);
