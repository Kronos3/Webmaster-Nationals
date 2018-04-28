/*import {Slideshow} from './timeline.js';
import {setTimeline} from './timeline.js';
import {timeline} from './timeline.js';
import {Preload} from './preload.js';
import {PNGAnimation} from "./compression.js";
<<<<<<< Updated upstream
import {AnimationHandler} from "./animation";
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

let animation;
let animation_model;

let dots_one;

let subtimeline;
let timeline;
let head  = document.getElementsByTagName('head')[0];

let css_files = [];

function css_load (url, border, _max=true) {
	let link  = document.createElement('link');
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = "css/" + url + ".css";
	link.media = 'all';
	head.appendChild(link);
	
	let index = css_files.push({
		el: link,
		border: border,
		max: _max,
		active: false
	});
	
	if (check_active (index - 1))
		css_files[index].active = true;
}

function check_active (i) {
	let cond = false;
	if (css_files[i].max) {
		if (screen.width >= css_files.border)
			cond = true;
	}
	else {
		if (screen.width <= css_files.border)
			cond = true;
	}
	
	return cond;
}

/*
function handle_screen_change (i) {
	if (i >= css_files.length)
		return;
	
	let cond = check_active (i);
	if (!cond)
		if (css_files[i].active)
			css_files[i].el.remove ();
	else
		if (!css_files[i].active)
			head.appendChild(css_files[i].el);
	handle_screen_change(++i);
}*/

let templates;

window.onload = function () {
	let compression_handler = function (ab, next) {
		return new PNGAnimation(ab, next);
	};
	
	templates = new TemplateHandler (
		document.getElementById("_____header"),
		document.getElementById("_____text"),
		"content/step.txt");
	
	preload = new Preload ([
		["/resources/anim_anim1/anim1_1200_675.cpng"],
		["/resources/anim_model/model.cpng"]
	],[
		compression_handler,
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
				before: function (index){timeline.scroll(index)},
			});
		});
		animation = new AnimationHandler (preload.loads[0].urls, 24, document.getElementById('anim1'), [0, -60]);
		//animation_model = new AnimationHandler (preload.loads[1].urls, 24, document.getElementById('model'));
		//animation_model.loop (0, 71);
		
		dots_one = new ConnectDots ($("#points_one")[0]);
		dots_one.run();
	});
	
	timeline = new Timeline([function () {
		$(".timeline > ul").addClass ("timeline-dark");
		$(".site-grid").addClass ("dark");
	}, function () {
		$(".timeline > ul").removeClass ("timeline-dark");
		$(".site-grid").removeClass ("dark");
		setTimeout(() => {
				templates.renderStep(0);
				animation.render(0);
				animation.play(24);
				subtimeline.setStep(0);
			}, 50);
	}, function () {
		$(".timeline > ul").addClass ("timeline-dark");
		$(".site-grid").addClass ("dark");
	}]);
	
	preload.start ();
	
	subtimeline = new SubTimeline ((k) => animation.play(k), (k) => animation.rewind(k), [24, 57, 118],
		function () {return $.scrollify.current().children(".info")}, 1, (i) => templates.renderStep (i));
	
	$(".down-arrow").click ($.scrollify.next);
	$(".timeline > ul > li").click(function(){$.scrollify.move($(this).index());});
	$(".keyboard .left").click(function () {subtimeline.back ()});
	$(".keyboard .right").click(function () {subtimeline.next ()});
};

$(document).keydown(function(e) {
	if (e.keyCode === 37) {
		subtimeline.back ();
	}
	else if (e.keyCode === 39) {
		subtimeline.next();
	}
});