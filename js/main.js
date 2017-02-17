/* The nav class */

class NavSub {
  constructor(elem) { // Pass raw element, not jquery element
    this.title = $(elem).text();
    this.image = $(elem).data('img');
    this.index = $('.nav').index (elem);
  }
}

$(function() {
    
    setInterval(function(){
        if (parseInt(window.getComputedStyle($('.lander-slide')[0]).getPropertyValue ('--main-index')) + 1 == $('.lander-slide > img').length) {
            $('.lander-slide')[0].style.setProperty ('--main-index', 0);
            return;
        }
        $('.lander-slide')[0].style.setProperty ('--main-index', parseInt(window.getComputedStyle($('.lander-slide')[0]).getPropertyValue ('--main-index')) + 1);
    }, 3000);
});
