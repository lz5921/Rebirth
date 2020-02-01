const toTop = ($) => {
  var returnTop = $('.click-to-top');
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
      returnTop.addClass('bounceInRight').removeClass('bounceOutDown');
    } else {
      returnTop.removeClass('bounceInRight').addClass('bounceOutDown');
    }
  });
  returnTop.click(function () {
    $('body, html').animate({
      scrollTop: 0
    }, 500);
  });
};

export default toTop(window.jQuery);
