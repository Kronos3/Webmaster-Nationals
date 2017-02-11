String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

$(function() {
    $('.fadein img:gt(0)').hide();
    
    setInterval(function () {
        $('.fadein :first-child').fadeOut()
                                 .next('img')
                                 .fadeIn()
                                 .end()
                                 .appendTo('.fadein');
    }, 4000); // 4 seconds
});
