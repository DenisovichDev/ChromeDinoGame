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
		this.type = (random([0, 1]));
		if (this.type == 0) {
			this.image = terrain_1;
		} else {
			this.image = terrain_2;
		}
		this.h = this.image.height;
		this.w = this.image.width;
		this.x = width;
		this.y = ground - this.h;
		this.vx = speed;
	}

	show() {
		if (this.type == 0) {
			image(this.image, this.x, ground - 12);
		} else {
			image(this.image, this.x, ground - 1);
		}
	}

	move() {
		this.x -= this.vx;
	}
}