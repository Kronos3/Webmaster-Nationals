/*import {Slideshow} from './timeline.js';
import {setTimeline} from './timeline.js';
import {timeline} from './timeline.js';
import {Preload} from './preload.js';
import {PNGAnimation} from "./compression.js";
*/
String.prototype.format = function (..._args) {
    let args = _args;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined'
            ? args[number] : match;
    });
};

Array.prototype.indexOf || (Array.prototype.indexOf = function (d, e) {
    let a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    let c = Object(this),
        b = c.length >>> 0;
    if (0 === b) return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a] === d) return a;
        a++
    }
    return -1
});

let preload;
let slideshow;

window.onload = function () {

    let compression_handler = function (ab, next) {
        return new PNGAnimation(ab, next);
    };
    
    preload = new Preload ([
        ["/resources/anim1/anim1.cpng"]
    ],[
        compression_handler
    ], function () {
        $(preload.logo.get()).addClass ("loaded");
        $(".content").addClass ("loaded");
        $(function() {
            $.scrollify({
                easing: "easeInOutCubic",
                section : ".content",
                scrollSpeed: 800,
                touchScroll: false,
                before:setTimeline,
            });
        });
    });
    
    preload.start ();
    slideshow = new Slideshow ($(".slideshow"));
    slideshow.start();
    
    $(".down-arrow").click ($.scrollify.next);
    $(".timeline > ul > li").click(function(){$.scrollify.move($(this).index());});
    $(".keyboard .left").click(timeline.back);
    $(".keyboard .right").click(timeline.next);
};

/*
class productStep {
    constructor (parent, step_arr) {
        //this.current =
    }
    
    next () {
    
    }
}
*/
$(document).keydown(function(e){
    if (e.keyCode === 37) {
        timeline.back ();
    }
    else if (e.keyCode === 39) {
        timeline.next();
    }
});