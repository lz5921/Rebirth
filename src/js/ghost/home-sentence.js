const toggleSentence = (window) => {
  const $ = window.jQuery;
  $.ajax({
    method: 'GET',
    url: `https://v1.alapi.cn/api/mingyan`,
    dataType: 'json',
    data: {
      typeid: Math.round(Math.random() * 45) + 1
    },
    success: function (result) {
      $('.home-sentence').text(result.data.content);
    }
  });
};

export const homeSentence = (window) => {
  toggleSentence(window);
};

export default homeSentence(window);
