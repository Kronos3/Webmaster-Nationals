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

class Timeline {
    constructor (handlers) {
        this.handlers = handlers;
    }
    
    scroll (index) {
        let currActive = $(".timeline > ul > .active");
        $(currActive.get()).removeClass ("active");
        $(currActive.parent().children ().get(index)).addClass ("active");
        this.handlers[index] ();
    }
}

class SubTimeline {
    constructor(steps, target, activeIndex) {
        this.steps = steps;
        this.current = 0;
        this.target = target;
        this.activeIndex = activeIndex;
    }
    
    static setStep(index) {
        let currActive = SubTimeline.getScroll();
        $(currActive.get()).removeClass("active");
        $(currActive.parent().children().get(index)).addClass("active");
    }
    
    static getScroll() {
        return $.scrollify.current().children(".timeline-bottom").children("ul").children(".active");
    }
    
    next() {
        if (this.activeIndex !== $.scrollify.current().index() - 2)
            return;
        let keyboard = $.scrollify.current().children(".keyboard");
        
        if (keyboard.children (".right").hasClass("disabled"))
            return;
    
        keyboard.children (".left").removeClass("disabled");
        
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
        SubTimeline.setStep(this.current);
    }
    
    back () {
        if (this.activeIndex !== $.scrollify.current().index() - 2)
            return;
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
        SubTimeline.setStep(this.current);
    }
}