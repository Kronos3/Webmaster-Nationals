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
    for (var i = 0; i != $('#shapes-mask > svg').length; i++) {
        setup_pos ($('#shapes-mask > svg').get(i), (Math.random() * (-0.08 - 0.08) + 0.08).toFixed(4),(Math.random() * (-0.120 - 0.12) + 0.12).toFixed(4));
    }
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;
        event = event || window.event;
        
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        for (var i = 0; i != $('#shapes-mask > svg').length; i++) {
            set_pos ($('#shapes-mask > svg').get(i), event.pageX, event.pageY);
        }
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

function set_pos (e, x, y) { // Use negative for inverse
    $(e).css("transform", "matrix(-1, 0, 0, -1, " + $(e).data ('xfactor') * x + " , " + $(e).data ('yfactor') * y + ")");
}

function setup_pos (e, x_scale, y_scale) {
    $(e).data ('xfactor', x_scale);
    $(e).data ('yfactor', y_scale);
}
