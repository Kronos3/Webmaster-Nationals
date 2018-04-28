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
	constructor(steps_nums, activeIndex, every) {
		this.current = 0;
		this.activeIndex = activeIndex;
		this.every = every;
		this.step_nums = steps_nums;
	}
	
	setStep(index) {
		let currActive = SubTimeline.getScroll();
		$(currActive.get()).removeClass("active");
		$($.scrollify.current().children(".timeline-bottom").children("ul").children().get(index)).addClass("active");
		this.current = index;
		
		this.updateKeyboard ();
	}
	
	static getScroll() {
		return $.scrollify.current().children(".timeline-bottom").children("ul").children(".active");
	}
	
	updateKeyboard () {
		let keyboard = $.scrollify.current().children(".keyboard");
		
		keyboard.children(".right").removeClass ("disabled");
		keyboard.children(".left").removeClass ("disabled");
		
		if (this.current + 1 >= this.step_nums[this.activeIndex])
			keyboard.children(".right").addClass ("disabled");
		else if (this.current - 1 < 0)
			keyboard.children(".left").addClass ("disabled");
	}
	
	next() {
		if (this.current + 1 >= this.step_nums[this.activeIndex])
			return;
		
		this.setStep(++this.current);
		this.every (this.current, true);
	}
	
	back() {
		if (this.current - 1 < 0)
			return;
		this.setStep(--this.current);
		this.every (this.current, false);
	}
}