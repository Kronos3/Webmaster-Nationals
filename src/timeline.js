//import {ElementObject} from "./element.js";

class Slideshow extends ElementObject {
    constructor (el) {
        super ('');
        this.element = el;
    }
    
    start () {
        let curr = 0;
        let len = this.child("ol").get().getElementsByTagName("li").length;
        setInterval(function () {
            curr = ++curr % len;
            $("#slideshow-hover").css("top", "calc({0}00%/{1})".format(curr, len));
        }, 3000);
    }
}

function setTimeline (index) {
    let currActive = $(".timeline > ul > .active");
    $(currActive.get()).removeClass ("active");
    $(currActive.parent().children ().get(index)).addClass ("active");
}

let timeline = {
    current: 0,
    class_iter: ["first", "second"],
    target_el: function () {return $.scrollify.current().children(".info")},
    steps: [
        {
            in: function () {},
            out: function () {}
        },
        {
            in: function () {},
            out: function () {}
        }
    ],
    setTimeline (index) {
        let currActive = $.scrollify.current().children (".timeline-bottom").children ("ul").children (".active");
        $(currActive.get()).removeClass ("active");
        $(currActive.parent().children ().get(index)).addClass ("active");
    },
    next () {
        if ($.scrollify.current().children(".keyboard").children (".right").hasClass("disabled"))
            return;
        
        $.scrollify.current().children(".keyboard").children (".left").removeClass("disabled");
        
        timeline.target_el ().removeClass (timeline.class_iter[timeline.current]);
        if (timeline.steps[timeline.current].out !== undefined)
            timeline.steps[timeline.current].out();
        
        timeline.current++;
        timeline.target_el ().addClass (timeline.class_iter[timeline.current]);
        if (timeline.steps[timeline.current].in !== undefined)
            timeline.steps[timeline.current].in ();
        
        if (timeline.current + 1 === timeline.steps.length) {
            $.scrollify.current().children(".keyboard").children (".right").addClass("disabled");
        }
        timeline.setTimeline (timeline.current);
    },
    back () {
        if ($.scrollify.current().children(".keyboard").children (".left").hasClass("disabled"))
            return;
        $.scrollify.current().children(".keyboard").children (".right").removeClass("disabled");
    
        timeline.target_el ().removeClass (timeline.class_iter[timeline.current]);
        if (timeline.steps[timeline.current].out !== undefined)
            timeline.steps[timeline.current].out();
        timeline.current--;
        timeline.target_el ().addClass (timeline.class_iter[timeline.current]);
        if (timeline.steps[timeline.current].in !== undefined)
            timeline.steps[timeline.current].in ();
        if (timeline.current === 0) {
            $.scrollify.current().children(".keyboard").children (".left").addClass("disabled");
        }
        timeline.setTimeline (timeline.current);
    }
};