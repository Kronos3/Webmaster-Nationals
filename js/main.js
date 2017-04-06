function next (e) {
    
}

function prev (e) {
    
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
        transitionDuration: 1000,
        quietPeriodBetweenTwoScrollEvents: 400,
    });
});
