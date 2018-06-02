const width = 800;
const height = 400;

const ground = height * 0.5;

function preload() {
  amp = loadImage('./assets/charx4.png');
}

function Work(y = 24) {
  this.x = width - 100;
  this.y = y;

  this.v = 10;

  this.show = function() {
    text('งาน', this.x, this.y);
    textSize(24);
  }

  this.update = function() {
    this.x -= 10;
  }

  this.offscreen = function() {
    return this.x <= 0
  }

  this.hit = function(char) {
    return char.x <= height * 0.5 - 100 && (this.y >= char.y || this.y <= (char.y - height * 0.5))
  }
}

function Amp() {
  this.x = 0;
  this.y = ((height * 0.5)) - 100;

  this.g = 1;
  this.v = 0;

  this.vx = 0;

  this.width = height * 0.5;
  this.height = height * 0.5;

  this.show = function() {
    image(amp, this.x, this.y, (height * 0.5), (height * 0.5));
  }

  this.update = function() {
    this.v += this.g;
    this.y += this.v;

    this.x += this.vx;

    if (this.y >= ground) {
      this.v = 0;
      this.y = ground;
    }

    if (this.y <= 0 - 5) {
      this.y = 0;
    }
  }

  this.jump = function() {
    if (this.v >= 0) {
      this.v -= this.g + 20;
    }
  }

  this.right = function() {
    this.vx += this.g + 5;
  }

  this.goTo = function(x) {
    this.vx += x;
  }
}

function Text() {

  this.show = function(msg) {
    text('เค้าสัญญาณว่าเกมหน้า จะดีกว่านี้ :P', 10, 50);
    textSize(42);
  }
}

let char
let work
const works = []

function setup() {
  createCanvas(width, height);
  // background('#A4C5DF');
  // image(amp, 0, ((height * 0.5)), (height * 0.5), (height * 0.5));
  char = new Amp();
  work = new Work();
  works.push(work);
  setTimeout(function () {
    works.push(new Work(320));
    setTimeout(function () {
      works.push(new Work(380));
      setTimeout(function () {
        works.push(new Work(120));
      }, 1000)
    }, 2000)
  }, 2000)

  setTimeout(function(){
    works.push(new Work(320));

    setTimeout(function () {
      works.push(new Work(344));
      setTimeout(function () {
        works.push(new Work(328));
        setTimeout(function () {
          works.push(new Work(232));
          setTimeout(function () {
            works.push(new Work(128));
            setTimeout(function () {
              works.push(new Work(220));
              setTimeout(function () {
                works.push(new Work(164));
                shower.push(new Text());
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }, 5000);
}

const shower = []

function draw() {
  background('#fff');
  char.update();
  char.show();

  for (let i = works.length - 1; i >= 0; i--) {
    works[i].show()
    works[i].update()
    if (works[i].hit(char)) {
      console.log('HIT')
    }
    if (works[i].offscreen()) {
      works.splice(i, 1);
    }
  }

  for (let i = shower.length - 1; i >= 0; i--) {
    shower[i].show()
  }
}

function touchStarted() {
  char.jump()
}

var value = 0;

function touchMoved() {
  char.goTo(value += 0.05)
}

function keyPressed() {
  if (keyCode === 38 || keyCode === 32) {
    char.jump()
  }
  if (keyCode === 38 || keyCode === 39) {
    char.right()
  }
}