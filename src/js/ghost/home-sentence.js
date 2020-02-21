const toggleSentence = (window) => {
  const $ = window.jQuery;
  $.ajax({
    method: 'GET',
    url: `https://api.imjad.cn/hitokoto`,
    dataType: 'json',
    data: {
      charset: 'utf-8',
      encode: 'json'
    },
    success: function (result) {
      $('.home-sentence').text(result.hitokoto);
    }
  });
};

const homeSentence = (window) => {
  toggleSentence(window);
};

export default homeSentence(window);
