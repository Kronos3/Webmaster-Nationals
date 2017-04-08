function next (e) {
    var i = $('.__step.active').index();
    if (i == $('.__step').length - 1 ) {
        return;
    }
    i += 1;
    $('.__step-label.hover').removeClass('hover');
    $('.top').css('transform', 'translateY(' + (-100*i).toString() + '%)');
    $('.__step.active').toggleClass ('active');
    $($('.__step').get(i)).toggleClass('active');
    $($('.__step').get(i)).children ('.__step-label').addClass('hover');
    $('.content.active').toggleClass('active');
    $($('.content').get (i)).toggleClass ('active');
    sleep(600).then(() => {
        $('.__step-label.hover').removeClass('hover');
    })
}

function ret (e) {
    return;
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function prev (e) {
    var i = $('.__step.active').index();
    if (i == 0) {
        return;
    }
    i -= 1;
    $('.__step-label.hover').removeClass('hover');
    $('.top').css('transform', 'translateY(' + (-100*i).toString() + '%)');
    $('.__step.active').toggleClass ('active');
    $($('.__step').get(i)).toggleClass('active');
    $($('.__step').get(i)).children ('.__step-label').addClass('hover');
    $('.content.active').toggleClass('active');
    $($('.content').get (i)).toggleClass ('active');
    sleep(600).then(() => {
        $('.__step-label.hover').removeClass('hover');
    })
}

$( document ).ready(function() {
    for (var i=0; i != $('.timeline > .__step').length; i++) {
        $('.timeline > .__step').get(i).addEventListener('click', function (e) {
            var f = $(this).index();
            $('.__step-label.hover').removeClass('hover');
            $('.top').css('transform', 'translateY(' + (-100*f).toString() + '%)');
            $('.__step.active').toggleClass ('active');
            $($('.__step').get(f)).toggleClass('active');
            $($('.__step').get(f)).children ('.__step-label').addClass('hover');
            $('.content.active').toggleClass('active');
            $($('.content').get (f)).toggleClass ('active');
            sleep(600).then(() => {
                $('.__step-label.hover').removeClass('hover');
            })
        });
        $('.timeline > .__step > .__step-label').get(i).addEventListener('click', function (e) {
            var f = $(this).parent().index();
            $('.__step-label.hover').removeClass('hover');
            $('.top').css('transform', 'translateY(' + (-100*f).toString() + '%)');
            $('.__step.active').toggleClass ('active');
            $($('.__step').get(f)).toggleClass('active');
            $($('.__step').get(f)).children ('.__step-label').addClass('hover');
            $('.content.active').toggleClass('active');
            $($('.content').get (f)).toggleClass ('active');
            sleep(600).then(() => {
                $('.__step-label.hover').removeClass('hover');
            })
        });
        
    }
});


$( document ).ready(function() {
    $("body").scrollsteps({
        up: prev,
        down: next,
        left: ret,
        right: ret,
        transitionDuration: 400,
        quietPeriodBetweenTwoScrollEvents: 200,
    });
});

function get_pos (e, x_scale, y_scale) { // Use negative for inverse
    
}
