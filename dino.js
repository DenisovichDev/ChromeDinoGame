class Dino {

  constructor() {
    this.w = 96;
    this.h = 112;
    this.x = 50;
    this.base = refFrame - this.h;
    this.y = this.base;
    this.vy = 0;
    this.gravity = 2;
    this.run = true;
    this.jumping = false;
    this.dead = false;
  }

  jump() {
    this.jumping = true;
    this.run = false;
    this.vy = -30;
  }

  hits(obstacle) {
    return collideRectRect(this.x, this.y, this.w - 10, this.h - 10, obstacle.x, obstacle.y + 15, obstacle.w, obstacle.h)
  }

  move() {
    this.y += this.vy;
    if (this.y < this.base)
      this.vy += this.gravity;
    else
      this.vy = 0;

    this.y = constrain(this.y, 0, this.base);

    if (this.y == this.base) {
      this.jumping = false;
      this.run = true;
    }
  }

  show() {
    if (this.dead && this.run) {
      image(dinoDeadRun, this.x, this.y, this.w, this.h)
    } else if (this.dead && this.jump) {
      image(dinoDeadJump, this.x, this.y, this.w, this.h)
    } else if (this.run) {
      if (frameCount % 4 == 0 || frameCount % 4 == 1)
        image(dinoRun_1, this.x, this.y, this.w, this.h);
      else
        image(dinoRun_2, this.x, this.y, this.w, this.h);
    } else if (this.jumping) {
      image(dinoJump, this.x, this.y, this.w, this.h);
    }


    // noFill();
    // rect(this.x, this.y, this.w, this.h -10);
  }
}