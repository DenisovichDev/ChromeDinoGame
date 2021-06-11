class Dirt {
	constructor() {
		this.l = floor(random(5));
		this.x = floor(random(width));
		this.y = floor(random(ground, refFrame));
		this.vx = speed;
		
	}

	move() {
			this.x -= this.vx
		if (this.x + this.l <= 0) {
			this.x = width;
		}
	}

	show() {
		push();
		stroke(0);
		strokeWeight(2);
		line(this.x, this.y, this.x + this.l, this.y);
		pop()

	}
}

class Texture {
	constructor() {

	}
}