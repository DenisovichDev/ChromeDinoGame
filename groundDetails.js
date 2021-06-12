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

class Terrain {
	constructor() {
		this.h = 12;
		this.w = 70;
		this.x = width;
		this.y = ground - this.h;
		this.vx = speed;
	}

	show() {
		image(terrain_1, this.x, this.y);
	}

	move() {
		this.x -= this.vx;
	}
}