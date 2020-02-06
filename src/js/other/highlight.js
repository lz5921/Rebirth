import {loadScripts} from '../untils';

const blockLanguage = (block) => {
  let classes = block.className + ' ';
  classes += block.parentNode ? block.parentNode.className : '';
  let match = /\blang(?:uage)?-([\w-]+)\b/i.exec(classes);
  match = match === null ? null : match[1];
  return match;
};

const highlight = (window) => {
  const codeBlocks = window.document.querySelectorAll('pre code');
  const langList = [];
  if (codeBlocks.length === 0) return false;
  // 载入脚本高亮
  loadScripts([
    {
      id: 'highlight-js',
      url: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.0/build/highlight.min.js'
    },
    {
      id: 'highlight-line-numbers-js',
      url: 'https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.7.0/dist/highlightjs-line-numbers.min.js'
    }
  ]).then(async () => {
    // const promisel = new Promise((resolve, reject) => {
    //   codeBlocks.forEach((block, index) => {
    //     block.classList.add('hljs');
    //     const lang = blockLanguage(block);
    //     const hasLang = window.hljs.listLanguages().indexOf(lang) === -1 && lang !== 'html' && langList.indexOf(lang) === -1;
    //     if (hasLang) {
    //       langList.push(lang);
    //       loadScripts([{
    //         id: `highlight-${lang}-js`,
    //         url: `https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.0/build/languages/${lang}.min.js`
    //       }]).then(() => {
    //         console.log('dddd');
    //       });
    //     }
    //
    //     codeBlocks.length === index + 1 ? resolve() : null;
    //   });
    // });

    // await codeBlocks.forEach(block => {
    //   window.hljs.highlightBlock(block);
    // });
    // promisel.then((aa) => {
    //   console.log(aa);
    //   console.log(window.hljs.listLanguages());
    // });
  });
};

export default highlight(window);
