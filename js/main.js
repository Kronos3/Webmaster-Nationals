function next (e) {
    var i = $('.__step.active').index();
    if (i == $('.__step').length) {
        return;
    }
    i += 1;
    $('.top').css('transform', 'translateY(' + (-100*i).toString() + '%)');
    $('.__step.active').toggleClass ('active');
    $($('.__step').get(i)).toggleClass('active');
    
}

function prev (e) {
    var i = $('.__step.active').index();
    if (i == 0) {
        return;
    }
    i -= 1;
    $('.top').css('transform', 'translateY(' + (-100*i).toString() + '%)');
    $('.__step.active').toggleClass ('active');
    $($('.__step').get(i)).toggleClass('active');
}

$( document ).ready(function() {
    console.log($('.timeline > .__step').length);
    for (var i=0; i != $('.timeline > .__step').length; i++) {
        console.log ($('.timeline > .__step').get(i));
        $('.timeline > .__step').get(i).addEventListener('click', function (e) {
            var f = $(this).index();
            $('.top').css('transform', 'translateY(' + (-100*f).toString() + '%)');
            $('.__step.active').toggleClass ('active');
            $($('.__step').get(f)).toggleClass('active');
        });
    }
});


$( document ).ready(function() {
    $("body").scrollsteps({
        up: prev,
        down: next,
        transitionDuration: 400,
        quietPeriodBetweenTwoScrollEvents: 200,
    });
});
