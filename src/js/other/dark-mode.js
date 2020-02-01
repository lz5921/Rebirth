import {loadStyles} from '../untils';

const darkMode = (window) => {
  setTimeout(() => {
    const getColorMode = getComputedStyle(document.documentElement).getPropertyValue('--color-content').trim();
    if (getColorMode === 'dark') {
      loadStyles(['https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.0/build/styles/tomorrow-night-bright.min.css']);
    } else {
      loadStyles(['https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.0/build/styles/default.min.css']);
    }
  }, 0);
};

export default darkMode(window);
