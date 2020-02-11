import qrcode from '../other/qrcode';

const share = (window, $) => {
  $('.btn-share-popover').on('shown.bs.popover', () => {
    console.log(window.document.getElementById('wechat-qr-code-img'));
    qrcode.then(response => {
      console.log(response);
      // eslint-disable-next-line no-undef
      const qrcode = new QRCode(document.getElementById('wechat-qr-code-img'), {
        text: `${window.location.origin}${window.location.pathname}`,
        width: 128,
        height: 128,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: window.QRCode.CorrectLevel.H
      });
      console.log(qrcode);
    });
  });
};

export default share(window, window.jQuery);
