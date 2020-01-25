/**
 * 是否在页面最顶部
 * @param $ jQuery 对象
 * @returns {boolean}
 */
export const isScrollTop = ($) => {
  return $(document).scrollTop() <= 0;
};

/**
 * 添加导航样式
 * @param $ jQuery 对象
 */
export const addTopNav = ($) => {
  $('.main-header').addClass('top-nav');
  $('.header-navbar').addClass('navbar-dark').removeClass('navbar-light');
};

/**
 * 添加导航样式
 * @param $ jQuery 对象
 */
export const removeTopNav = ($) => {
  $('.main-header').removeClass('top-nav');
  $('.header-navbar').removeClass('navbar-dark').addClass('navbar-light');
};

/**
 * 异步载入脚本
 * @param scripts 脚本数组对象
 * @returns {Promise<Object[]>}
 */
export const loadScripts = (scripts) => {
  function get(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement('script');
      el.async = true;
      el.addEventListener('load', function () {
        resolve(src);
      }, false);
      el.addEventListener('error', function () {
        reject(src);
      }, false);
      el.src = src;
      (document.getElementsByTagName('body')[0] || document.getElementsByTagName('head')[0]).appendChild(el);
    });
  }

  const myPromises = scripts.map(function (script, index) {
    return get(script);
  });

  return Promise.all(myPromises);
};

/**
 * 防抖动函数
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};
