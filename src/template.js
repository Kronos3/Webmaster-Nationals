function SelectorHandler (str_sel, func_handler) {
	this.str = str_sel;
	this.handler = func_handler;
	
	return this;
}

SelectorHandler.prototype = {
	call (in_str) {
		let out_str = in_str.substring(this.str.length, in_str.search("\n"));
		this.handler (out_str);
		return out_str.length + this.str.length + 1;
	}
};

class Template {
	constructor (filepath, selectors, next) {
		this.filepath = filepath;
		this.selectors = selectors;
		this.file = null;
	}
	
	parseFile (callback) {
		let xmlHTTP = new XMLHttpRequest();
		xmlHTTP.open('GET', this.filepath, true);
		xmlHTTP.responseType = "text";
		
		let _this = this;
		xmlHTTP.onload = function () {
			_this.file = this.response;
			callback();
		};
		
		xmlHTTP.send ();
	}
	
	findSelector (str) {
		for (let k = 0; k < this.selectors.length; k++)
			if (str.substring(0, this.selectors[k].str.length) === this.selectors[k].str)
				return this.selectors[k];
		return null;
	}
}

const OPS = {
	INVALID: -1,
	INIT: -2,
	NEXT: 0,
	HEADER: 1,
	TEXT: 2,
};

class AI_NINA extends Template {
	constructor (filepath) {
		super (filepath, [
			new SelectorHandler ("---", (str) => {this.current_type = OPS.NEXT}),
			new SelectorHandler ("--", (str) => {this.current_type = OPS.HEADER; this.headers.push (str);}),
			new SelectorHandler ("-", (str) => {this.current_type = OPS.TEXT; this.texts.push (str);})
		]);
		this.current_type = OPS.INIT;
		this.headers = [];
		this.texts = [];
	}
	
	parseFile () {
		super.parseFile(() => {
			this.parseLoop (this.file);
		});
	}
	
	parseLoop (_str) {
		if (this.current_type === OPS.INVALID)
			return;
		let selector = this.findSelector(_str);
		if (selector === null) {
			this.current_type = OPS.INVALID;
			return;
		}
		
		this.parseLoop (
			_str.substring(selector.call (_str))
		);
	}
}

class TemplateHandler {
	constructor (header_el, text_el, file) {
		this.header_el = header_el;
		this.text_el = text_el;
		this.parent = $(header_el).parent();
		this.parsed = new AI_NINA(file);
		this.parsed.parseFile();
	}
	
	renderStep (index) {
		if (index > this.parsed.headers.length)
			return;
		
		this.header_el.textContent = this.parsed.headers[index];
		this.text_el.textContent = this.parsed.texts[index];
		this.playAnimation ();
	}
	
	playAnimation () {
		this.parent.removeClass ("anim");
		setTimeout(() => this.parent.addClass("anim"), 1);
	}
}