const comment = () => {
  if (document.getElementById('vcomments') !== null) {
    // eslint-disable-next-line no-undef
    new Valine({
      el: '#vcomments',
      appId: 'REGleanCloudAppIdREG',
      appKey: 'REGleanCloudAppKeyREG',
      serverURLs: 'REGleanCloudServerURLREG',
      notify: true,
      verify: true,
      avatar: 'mm',
      visitor: true,
      highlight: true,
      recordIP: true,
      placeholder: '请您理智发言，共建美好社会！',
      path: window.location.pathname
    });
  }
};

export default comment();
