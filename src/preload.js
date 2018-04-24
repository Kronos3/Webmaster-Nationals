//import {Logo} from './logo.js';

class Preload {
	constructor(preload_ar_ar, construtor_ar, end_callback) {
		this.preload_ar = preload_ar_ar;
		this.constructor_ar = construtor_ar;
		this.logo = new Logo('../resources/logo.svg', 'name');
		this.end = end_callback;
		this.total_size = 0;
		this.loaded_size = 0;
		this.loads = [];
		this.loads.length = preload_ar_ar.length;
	}
	
	start() {
		this.add_file_size(0, () => {
			this.load(0, () => {
				this.end();
			});
		});
	}
	
	add_file_size(index, final_callback) {
		
		if (index >= this.preload_ar.length)
			return final_callback();
		
		let xhr = new XMLHttpRequest();
		xhr.addEventListener("load", () => {
			this.total_size += parseInt(xhr.getResponseHeader("Content-Length"));
			this.add_file_size(++index, final_callback)
		});
		
		xhr.open("HEAD", this.preload_ar[index]);
		xhr.send();
	}
	
	load(index, final_callback) {
		if (index >= this.preload_ar.length)
			return final_callback();
		
		let xmlHTTP = new XMLHttpRequest();
		xmlHTTP.open('GET', this.preload_ar[index], true);
		xmlHTTP.responseType = 'arraybuffer';
		
		let _this = this;
		xmlHTTP.onload = function () {
			_this.constructor_ar[index](this.response, function () {
				_this.loads[index] = this;
				_this.load(++index, final_callback);
			});
		};
		
		xmlHTTP.onprogress = function (e) {
			let _new = e.loaded - this.already;
			this.already = e.loaded;
			_this.loaded_size += _new;
			_this.render();
		};
		
		xmlHTTP.onloadstart = function () {
			this.already = 0;
		};
		xmlHTTP.send();
	}
	
	render() {
		this.logo.update_load(this.loaded_size / this.total_size * 100);
	}
}