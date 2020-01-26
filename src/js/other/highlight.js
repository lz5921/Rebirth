const blockLanguage = (block) => {
  let classes = block.className + ' ';
  classes += block.parentNode ? block.parentNode.className : '';
  let match = /\blang(?:uage)?-([\w-]+)\b/i.exec(classes);
  match = match === null ? null : match[1];
  return match;
};

const highlight = (document, hljs) => {
  addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre code');
    const worker = new Worker('/assets/js/worker.highlightjs.js');
    worker.onmessage = (event) => {
      const highlightData = JSON.parse(event.data);
      codeBlocks[highlightData.index].innerHTML = highlightData.result.value;
    };
    codeBlocks.forEach((block, index) => {
      worker.postMessage(JSON.stringify({
        code: block.textContent,
        lang: blockLanguage(block),
        index: index
      }));
    });
  });
};

export default highlight(window.document, window.hljs);
