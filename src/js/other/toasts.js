import { formatTime } from '../untils/dateTime';

/**
 * 封装 BootStrap Toast 方法
 * @param $ jQuery 对象 必填
 * @param options toast 配置选项 选填
 */
export const baseToast = ($, options) => {
  const timeTmp = new Date().valueOf(); // 用于 Toast 唯一性
  const defaultOptions = {
    animation: true,
    autohide: true,
    delay: 2500
  };
  const toastId = options.id === undefined ? console.warn('未填写 Toast 节点ID') : options.id;
  const toastContent = options.content === undefined ? console.warn('未填写 Toast 内容') : options.content;
  const toastTime = options.time === undefined ? formatTime(new Date()) : formatTime(new Date(options.time));
  const toastOptions = options.config === undefined ? defaultOptions : options.config;
  const toastParDom = '.toast-wrapper .toast-wrapper-list';
  const toastTemplate = `
<div id="${toastId + timeTmp}" class="toast toast-wrapper-list-item" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <img src="https://iiong.com/favicon.png" class="rounded mr-2" alt="site-logo">
    <strong class="mr-auto">淮城一只猫</strong>
    <small>${toastTime}</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">${toastContent}</div>
</div>
`;
  $(toastParDom).append(toastTemplate);
  $(`#${toastId + timeTmp}`)
    .toast(toastOptions)
    .toast('show')
    .on('hidden.bs.toast', function () {
      $(this).remove();
    });
};

const toasts = (window, $) => {
  addEventListener('DOMContentLoaded', () => {
    baseToast($, {
      id: 'system-toast',
      content: '这是一段测试数据：你好世界！<a>Hello World</a>！！！<strong>你好啊！！！！</strong>',
      time: '2020-02-08 14:45'
    });
  });
};

export default toasts(window, window.jQuery);
