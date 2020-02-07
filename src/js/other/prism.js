import {loadScripts, loadStyles} from '../untils';

const prism = (window) => {
  const prismSrc = `https://cdn.jsdelivr.net/npm/prismjs@1.19.0`;
  const codeBlocks = window.document.querySelectorAll('.post-content pre>code');
  if (codeBlocks.length === 0) return false;
  loadStyles([
    {
      id: 'prism-line-numbers-css',
      url: `${prismSrc}/plugins/line-numbers/prism-line-numbers.min.css`
    },
    {
      id: 'prism-toolbar-css',
      url: `${prismSrc}/plugins/toolbar/prism-toolbar.min.css`
    }
  ]);
  loadScripts([
    {
      id: 'prism-core-js',
      url: `${prismSrc}/components/prism-core.min.js`
    },
    {
      id: 'prism-line-numbers-js',
      url: `${prismSrc}/plugins/line-numbers/prism-line-numbers.min.js`
    },
    {
      id: 'prism-prism-toolbar-js',
      url: `${prismSrc}/plugins/toolbar/prism-toolbar.min.js`
    },
    {
      id: 'prism-show-language-js',
      url: `${prismSrc}/plugins/show-language/prism-show-language.min.js`
    }
  ]).then(() => {
    loadScripts([
      {
        id: 'prism-autoloader-js',
        url: `${prismSrc}/plugins/autoloader/prism-autoloader.min.js`
      }
    ]).then(() => {
      codeBlocks.forEach((block, index) => {
        if (block.classList.contains('language-html')) {
          block.classList.remove('language-html');
          block.classList.add('language-markup');
        }
        block.parentElement.classList.add('line-numbers');
        window.Prism.plugins.autoloader.languages_path = `${prismSrc}/components/`;
        window.Prism.highlightAll();
      });
    });
  });
};

export default prism(window);
