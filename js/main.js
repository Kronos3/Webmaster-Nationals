function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

var asset_tops = []

$( document ).ready(function() {
    for (var i = 0; i != $('#shapes-mask > svg').length; i++) {
        setup_pos ($('#shapes-mask > svg').get(i), (Math.random() * (-0.18 - 0.18) + 0.08).toFixed(4),(Math.random() * (-0.120 - 0.12) + 0.12).toFixed(4));
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
    
    for (var i=0; i!=$('.asset').length; i++) {
        asset_tops[i] = parseInt($($('.asset').get(i)).css('top'), 10);
    }
});


function set_pos (e, x, y) { // Use negative for inverse
    $(e).css("transform", "matrix(-1, 0, 0, -1, " + $(e).data ('xfactor') * x + " , " + $(e).data ('yfactor') * y + ")");
}

function setup_pos (e, x_scale, y_scale) {
    $(e).data ('xfactor', x_scale);
    $(e).data ('yfactor', y_scale);
}

var step_colors = [
    [119,108,104],
    [161,148,129],
    [138,131,198],
    [94,119,64],
    [255,255,255],
]

function pickHex(color1, color2, weight) {
    var p = weight;
    var w = p * 2 - 1;
    var w1 = (w/1+1) / 2;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}

$(window).scroll (function (e) {
    var st = $(this).scrollTop();
    
    var step_ratio = st / $(window).height() + 1;
    var prev_step = parseInt(step_ratio, 10);
    if ((step_ratio - prev_step) > 0.5) {
        $('.__step.active').toggleClass ('active');
        $($('.__step').get(prev_step)).addClass('active');
    }
    if ((step_ratio - prev_step) < 0.5) {
        $('.__step.active').toggleClass ('active');
        $($('.__step').get(prev_step - 1)).addClass('active');
    }
    
    var backcolor = pickHex (step_colors [prev_step], step_colors [prev_step - 1], step_ratio - prev_step);
    $('body').css ('background', 'rgba({0}, {1}, {2}, 1)'.format (backcolor[0], backcolor[1], backcolor[2]));
    
    for (var i=0; i!=$('.asset').length; i++) {
        var parent_top = parseInt($($('.asset').get(i)).parent().offset().top, 10);
        if (i == 1) {console.log ((st - parent_top))};
        $($('.asset').get(i)).css ('top', '{0}%'.format(50 +  -4 * (Math.cbrt ( 0.1 * (st - parent_top)  ))  ));
    }
});
