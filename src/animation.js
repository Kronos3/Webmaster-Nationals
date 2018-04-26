class AnimationHandler {
	constructor(frames, fps, parent, renderSettings) {
		this.currentFrame = 0;
		
		this.parent = parent;
		this.fpms = 1000 / fps;
		this.frames = frames;
		
		this.parent.width = $(this.parent).parent().width();
		this.parent.height = $(this.parent).parent().height();
		
		this.context = parent.getContext('2d');
		this.img = new Image();
		if (renderSettings === undefined || renderSettings.length < 2)
			renderSettings = [0, 0];
		
		this.img.onload = () => {
			let hRatio = this.parent.width / this.img.width;
			let vRatio = this.parent.height / this.img.height;
			
			let ratio = 1;
			if (AnimationHandler.check_mobile())
				ratio = Math.min ( hRatio, vRatio );
			else
				ratio = Math.max ( hRatio, vRatio );
			
			this.context.save();
			this.context.clearRect(0, 0, this.parent.width, this.parent.height);
			this.context.drawImage(this.img, 0, 0, this.img.width,
				this.img.height, renderSettings[0], renderSettings[1],
				this.img.width*ratio, this.img.height*ratio);
			this.context.restore();
		};
		
		this.render(0);
	}
	
	static check_mobile () {
		let max_mobile_ratio = 12 / 9;
		return (window.innerWidth / window.innerHeight <= max_mobile_ratio);
	}
	
	
	render(frameNumber) {
		this.currentFrame = frameNumber;
		this.img.src = this.frames[frameNumber];
	}
	
	play(to) {
		if (AnimationHandler.check_mobile()) {
			this.render (to);
			return;
		}
		
		if (this.anim !== undefined)
			clearInterval(this.anim);
		let _this = this;
		let i = this.currentFrame;
		
		this.anim = setInterval(function () {
			_this.render(i);
			i++;
			if (i >= to) {
				clearInterval(_this.anim);
				_this.anim = undefined;
			}
		}, this.fpms);
	}
	
	rewind(to) {
		if (AnimationHandler.check_mobile()) {
			this.render (to);
			return;
		}
		
		if (this.anim !== undefined)
			clearInterval(this.anim);
		let _this = this;
		let i = this.currentFrame;
		this.anim = setInterval(function () {
			_this.render(i);
			i--;
			if (i < to) {
				clearInterval(_this.anim);
				_this.anim = undefined;
			}
		}, this.fpms);
	}
	
	loop (from, to) {
		this.render (from);
		
		let len = to - from;
		
		let _this = this;
		let i = 0;
		this.anim = setInterval(function () {
			i = (i + 1) % len;
			_this.render (i + from);
		}, this.fpms);
	}
	
	stopLoop () {
		if (this.anim !== undefined)
			clearInterval(this.anim);
	}
}