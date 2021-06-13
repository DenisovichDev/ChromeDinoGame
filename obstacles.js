class Cacti {

  constructor(t) {
    this.type = t;
    
    switch (this.type) {
      case 0: //small cactus
        this.w = 40;
        this.h = 80;
        break;
      case 1: //big cactus
        this.w = 60;
        this.h = 120;
        break;
      case 2: //small cacti
        this.w = 120;
        this.h = 80;
        break;
    }

    this.x = width;
    this.y = height - this.h - gapFromBottom;
  }

  move() {
    this.x -= speed;
  }

  show() {

    switch (this.type) {
      case 0:
        image(cactusSmall, this.x, this.y, this.w, this.h);
        break;
      case 1:
        image(cactusBig, this.x, this.y, this.w, this.h);
        break;
      case 2:
        image(cacti, this.x, this.y, this.w, this.h);
        break;
    }
    // noFill();
    // rect(this.x, this.y +20, this.w, this.h);
  }
}