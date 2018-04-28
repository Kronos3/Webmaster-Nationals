class Color {
	constructor () {
		this.r = Color.value();
		this.g = Color.value();
		this.b = Color.value();
		this.style = "rgba(" + this.r + "," + this.g + "," + this.b + ",1)";
		//this.style = "rgba(233,72,152,1)";
	}
	
	static value () {
		return Math.floor(Math.random() * 255);
	}
}

class Dot {
	constructor (parent) {
		this.parent = parent;
		this.x = Math.random() * this.parent.parent.width;
		this.y = Math.random() * this.parent.parent.height;
		
		// Speed of Dots (+- 0.5)
		this.vx = Math.random() - 0.5;
		this.vy = Math.random() - 0.5;
		
		this.radius = Math.random() * 2;
		this.color = new Color();
	}
	
	draw () {
		this.parent.context.beginPath();
		this.parent.context.fillStyle = this.color.style;
		this.parent.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		this.parent.context.fill();
	}
}

class ConnectDots {
	constructor(parent) {
		let interval = 70;
		let nb_num = 250;
		let radius_num = 60;
		
		this.interval = interval;
		this.nb_num = nb_num;
		this.radius_num = radius_num;
		
		this.parent = parent;
		
		this.updateSize();
		
		this.connectArea = {
			x: 50 * this.parent.width / 100,
			y: 50 * this.parent.height / 100
		};
		
		this.dots = {
			nb: this.nb_num,
			distMax: 100,
			//connectAreaRadius: canvas.width/4,
			connectAreaRadius: this.radius_num,
			array: []
		};
		
		$(window).resize(this.updateSize());
		
		$(this.parent).on ("mousemove", (e) => {
			this.connectArea.x = e.pageX;
			this.connectArea.y = e.pageY;
		});
	}
	
	static mixComponents(comp1, comp2, weight1, weight2) {
		return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
	}
	
	updateSize () {
		this.parent.width = Math.min ($(this.parent).parent().width(), window.innerWidth);
		this.parent.height = Math.min ($(this.parent).parent().height(), window.innerHeight);
		this.parent.style.display = 'block';
		this.context = this.parent.getContext("2d");
		this.context.lineWidth = 0.2;
	}
	
	gradient(dot1, dot2, midColor) {
		let grad = this.context.createLinearGradient(
			Math.floor(dot1.x), Math.floor(dot1.y),
			Math.floor(dot2.x), Math.floor(dot2.y));
		grad.addColorStop(0, dot1.color.style);
		grad.addColorStop(Math.floor(dot1.radius / (dot1.radius / dot2.radius)), midColor);
		grad.addColorStop(1, dot2.color.style);
		return grad;
	}
	
	lineStyle(dot1, dot2) {
		let r = ConnectDots.mixComponents(dot1.color.r, dot2.color.r, dot1.radius, dot2.radius);
		let g = ConnectDots.mixComponents(dot1.color.g, dot2.color.g, dot1.radius, dot2.radius);
		let b = ConnectDots.mixComponents(dot1.color.b, dot2.color.b, dot1.radius, dot2.radius);
		let midColor = 'rgba(' + Math.floor(r) + ',' + Math.floor(g) + ',' + Math.floor(b) + ', 0.8)';
		r = g = b = null;
		return this.gradient(dot1, dot2, midColor);
	}
	
	moveDots() {
		for (let i = 0; i < this.dots.nb; i++) {
			let dot = this.dots.array[i];
			
			if (dot.y < 0 || dot.y > this.parent.height)
				dot.vy = -dot.vy;
			else if (dot.x < 0 || dot.x > this.parent.width)
				dot.vx = -dot.vx;
			dot.x += dot.vx;
			dot.y += dot.vy;
			
			dot = null;
		}
	}
	
	connectDots() {
		for (let i = 0; i < this.dots.nb; i++) {
			for (let j = 0; j < this.dots.nb; j++) {
				if (i === j) continue;
				
				let dot1 = this.dots.array[i];
				let dot2 = this.dots.array[j];
				
				let xDiff = dot1.x - dot2.x;
				let yDiff = dot1.y - dot2.y;
				let xCoreDiff = dot1.x - this.connectArea.x;
				let yCoreDiff = dot1.y - this.connectArea.y;
				
				if ((xDiff < this.dots.distMax && xDiff > -this.dots.distMax)
					&& (yDiff < this.dots.distMax && yDiff > -this.dots.distMax)
					&& (xCoreDiff < this.dots.connectAreaRadius && xCoreDiff > -this.dots.connectAreaRadius)
					&& (yCoreDiff < this.dots.connectAreaRadius && yCoreDiff > -this.dots.connectAreaRadius)) {
					this.context.beginPath();
					this.context.strokeStyle = this.lineStyle(dot1, dot2);
					this.context.moveTo(dot1.x, dot1.y);
					this.context.lineTo(dot2.x, dot2.y);
					this.context.stroke();
					this.context.closePath();
				}
				
				dot1 = null;
				dot2 = null;
				xDiff = null;
				yDiff = null;
				xCoreDiff = null;
				yCoreDiff = null;
			}
		}
	}
	
	createDots() {
		for (let i = 0; i < this.dots.nb; i++)
			this.dots.array.push(new Dot(this));
	}
	
	drawDots() {
		for (let i = 0; i < this.dots.nb; i++)
			this.dots.array[i].draw();
	}
	
	animateDots() {
		this.context.clearRect(0, 0, this.parent.width, this.parent.height);
		this.moveDots();
		this.connectDots();
		this.drawDots();
		requestAnimationFrame(() => {this.animateDots ()});
	}
	
	run () {
		this.createDots();
		this.animateDots();
	}
}