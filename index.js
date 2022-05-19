// ? Targeting the canvas element and call the getContext API.
const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);

// ? Set the canvas width and height to the width of the window and the height to the height of the page ...
// ?  - 100 px.
canvas.width = window.innerWidth; // ?  window's width
canvas.height = window.innerHeight - 100; // ? window's height

// ? Set the center point of the canvas in variables.
const centerX = canvas.width / 2,
  centerY = canvas.height / 2;

// ? Initialize the player class which will throw the missiles to the projectiles (Enemies).
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  // ? The function which will draw the circle to the page.
  draw() {
    ctx.beginPath();
    // * Math.PI * 2 for a whole circle, Math.PI for a half.
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// ? Initialize the Missiles class which will create the missiles which will be thrown at the enemies.
class Missiles {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.velocity = velocity;
  }

  // ? The function which will draw the missile in the canvas.
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // ? The function which will update the x and y cords of the missile to make it move.
  update() {
    this.draw(); // * Calling the draw function to draw each update.
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

// ? Initialize the Enemies class which will create the enemies projectiles and move them to the player.
class Enemies {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.velocity = velocity;
  }

  // ? The function which will draw the missile in the canvas.
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // ? The function which will update the x and y cords of the missile to make it move.
  update() {
    this.draw(); // * Calling the draw function to draw each update.
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

// ? Make an instance of the Player class and assign it to the player variable.
const player = new Player(centerX, centerY, 30, "red");
player.draw(); // ? Draw the Player instance which assigned to the player variable.
