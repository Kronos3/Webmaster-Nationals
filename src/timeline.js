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

class Timeline {
    
    constructor(steps, target) {
        this.steps = steps;
        this.current = 0;
        this.target = target;
    }
    
    static setStep(index) {
        let currActive = Timeline.getScroll();
        $(currActive.get()).removeClass("active");
        $(currActive.parent().children().get(index)).addClass("active");
    }
    
    static getScroll() {
        return $.scrollify.current().children(".timeline-bottom").children("ul").children(".active");
    }
    
    next() {
        let keyboard = $.scrollify.current().children(".keyboard");
        
        if (keyboard.children (".right").hasClass("disabled"))
            return;
    
        keyboard.children (".left").removeClass("disabled");
    
        console.log (this.target);
        this.target().removeClass (this.current.toString ());
        if (this.steps[this.current].out !== undefined)
            this.steps[this.current].out();
        if (this.steps[this.current].next !== undefined)
            this.steps[this.current].next();
    
        this.current++;
        this.target().addClass (this.current.toString ());
        if (this.steps[this.current].in !== undefined)
            this.steps[this.current].in ();
    
        if (this.current + 1 >= this.steps.length) {
            keyboard.children (".right").addClass("disabled");
        }
        Timeline.setStep(this.current);
    }
    
    back () {
        let keyboard = $.scrollify.current().children(".keyboard");
    
        if (keyboard.children (".left").hasClass("disabled"))
            return;
    
        keyboard.children (".right").removeClass("disabled");
    
        this.target ().removeClass (this.current.toString ());
        if (this.steps[this.current].out !== undefined)
            this.steps[this.current].out();
        if (this.steps[this.current].back !== undefined)
            this.steps[this.current].back ();
    
        this.current--;
        this.target ().addClass (this.current.toString ());
        if (this.steps[this.current].in !== undefined)
            this.steps[this.current].in ();
    
        if (this.current <= 0) {
            keyboard.children (".left").addClass("disabled");
        }
        Timeline.setStep(this.current);
    }
}