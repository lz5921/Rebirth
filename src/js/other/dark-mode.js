const darkMode = (window, $) => {
  let getColorMode = null;
  // 初始化页面
  setTimeout(() => {
    getColorMode = window.sessionStorage.colorMode ? window.sessionStorage.colorMode.trim() : getComputedStyle(document.documentElement).getPropertyValue('--color-content').trim();
    if (getColorMode === 'dark') {
      window.$('.click-dark').remove();
      window.document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      window.document.documentElement.setAttribute('data-theme', 'light');
    }
  }, 0);
  // 手动切换
  $('.click-dark').click(event => {
    getColorMode = getComputedStyle(document.documentElement).getPropertyValue('--color-content').trim();
    $('#highlight-css').remove();
    if (getColorMode === 'dark') {
      window.sessionStorage.setItem('colorMode', 'light');
      window.document.documentElement.setAttribute('data-theme', 'light');
      window.document.documentElement.style.setProperty('--color-content', 'light');
    } else {
      window.sessionStorage.setItem('colorMode', 'dark');
      window.document.documentElement.setAttribute('data-theme', 'dark');
      window.document.documentElement.style.setProperty('--color-content', 'dark');
    }
  });
};

export default darkMode(window, window.jQuery);
