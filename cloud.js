class Cloud {

  constructor() {
    this.vx = 3;
    this.x = width;
    this.y = floor(random(height*0.75));
    this.w = 110;
  }

  move() {
    this.x -= this.vx;
  }

  show() {
    image(cloudImg, this.x, this.y);
  }
}