import { loadScripts } from '../untils'

const global = (window, $) => {
  // 百度推送
  window.location.protocol.split(':')[0] === 'https' ? loadScripts([{
    id: 'bd-push-js',
    url: 'https://zz.bdstatic.com/linksubmit/push.js'
  }]) : loadScripts([{
    id: 'bd-push-js',
    url: 'http://push.zhanzhang.baidu.com/push.js'
  }])
  window.document.querySelectorAll('.post-content-use-blank a').forEach(block => {
    block.setAttribute('target', '_blank')
  })
  window.document.querySelectorAll('.main-footer-info-navigation-list a').forEach(block => {
    block.setAttribute('target', '_blank')
  })
}

export default global(window, window.jQuery)
