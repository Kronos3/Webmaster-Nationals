class Point {
	constructor (canvas, x, y) {
		this.parent = canvas;
		this.context = this.parent.getContext("2d");
		this.x = x;
		this.y = y;
		this.deltaX = 0;
		this.deltaY = 0;
		
		this.connections = [];
	}
	
	connect (otherPoint) {
		this.connections.push(otherPoint);
		this.drawTo (otherPoint.x, otherPoint.y)
	}
	
	setPath (deltaX, deltaY) {
		this.deltaX = deltaX;
		this.deltaY = deltaY;
	}
	
	drawTo (x, y) {
		this.context.beginPath();
		this.context.moveTo (this.x, this.y);
		this.context.lineTo (x, y);
		this.context.stroke ();
	}
	
	update () {
		this.moveSelf(this.x + this.deltaX, this.y + this.deltaY);
		this.renderSelf ();
		for (let i = 0; i < this.connections.length; i++)
			this.drawTo(this.connections[i].x, this.connections[i].y);
	}
	
	renderSelf () {
		this.context.beginPath();
		this.context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
		this.context.fill();
	}
	
	moveSelf (x, y) {
		this.x = x;
		this.y = y;
	}
}

class PointHandler {
	constructor (canvas, coords) {
		this.canvas = canvas;
		this.points = [];
		let curr_x = 1;
		let curr_y = 1;
		
		let width = this.canvas.width / 100.0;
		let height = this.canvas.height / 100.0;
		
		for (let i = 0; i < coords.length; i++) {
			let pt = new Point (this.canvas, coords[i][0] * width, coords[i][1] * height);
			this.points.push (pt);
			
			if (i > 0)
				pt.connect(this.points[i - 1]);
			
			if (i % 2)
				curr_y *= -1;
			else
				curr_x *= -1;
			pt.setPath(curr_x, curr_y);
		}
	}
	
	update () {
		for (let i = 0; i < this.points.length; i++)
			this.points[i].update ();
	}
}