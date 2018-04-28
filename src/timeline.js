//import {ElementObject} from "./element.js";

class Slideshow extends ElementObject {
	constructor(el) {
		super('');
		this.element = el;
	}
	
	start() {
		let curr = 0;
		let len = this.child("ol").get().getElementsByTagName("li").length;
		setInterval(function () {
			curr = ++curr % len;
			$("#slideshow-hover").css("top", "calc({0}00%/{1})".format(curr, len));
		}, 3000);
	}
}

class Timeline {
	constructor(handlers) {
		this.handlers = handlers;
	}
	
	scroll(index) {
		let currActive = $(".timeline > ul > .active");
		$(currActive.get()).removeClass("active");
		$(currActive.parent().children().get(index)).addClass("active");
		this.handlers[index]();
	}
}

class SubTimeline {
	constructor(next, back, steps, target, activeIndex, every) {
		this.steps = steps;
		this.current = 0;
		this.target = target;
		this.activeIndex = activeIndex;
		this.every = every;
		this.every (this.current);
		
		this.hnext = next;
		this.hback = back;
	}
	
	setStep(index) {
		let currActive = SubTimeline.getScroll();
		$(currActive.get()).removeClass("active");
		$(currActive.parent().children().get(index)).addClass("active");
		this.current = index;
		
		let keyboard = $.scrollify.current().children(".keyboard");
		
		keyboard.children(".right").removeClass ("disabled");
		keyboard.children(".left").removeClass ("disabled");
		
		if (index + 1 >= this.steps.length)
			keyboard.children(".right").addClass ("disabled");
		else if (index - 1 < 0)
			keyboard.children(".left").addClass ("disabled");
		
		this.every (index);
	}
	
	static getScroll() {
		return $.scrollify.current().children(".timeline-bottom").children("ul").children(".active");
	}
	
	next() {
		if (this.activeIndex !== $.scrollify.current().index() - 2)
			return;
		this.hnext(this.steps[this.current + 1]);
		this.setStep(++this.current);
	}
	
	back() {
		if (this.activeIndex !== $.scrollify.current().index() - 2)
			return;
		this.hback(this.steps[this.current - 1]);
		this.setStep(--this.current);
	}
}