$(document).ready(function(){       
    var scroll_pos = 0;
    $(document).scroll(function() { 
        scroll_pos = $(this).scrollTop();
        if(scroll_pos > -1) {
            $("#back").css('background-color', '#585858');
        }
        else {
            $("#back").css('background-color', 'rgba(255,255,255,0)');
        }
    });
})

var hT = 0,
    hH = 0,
    wH = 0,
    wS = 0;

$(window).ready(function()
{
    hT = $('#con').offset().top;
    hH = $('#con').outerHeight();
    wH = $(window).height();
});

$(window).scroll(function() {
    wS = $(window).scrollTop();
    if ( wS < hT ){
        $("#con").css('top', '0px');
        $("#con").css('position', 'relative');
    }
    else {
        $("#con").css('top', '72px');
        $("#con").css('position', 'fixed');
    }
});
