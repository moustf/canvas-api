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

let missiles = []; // * The array in which we will save the missiles to render them.
let enemies = []; // * The array in which we will save the enemies projectiles to render them.

// ? The function which is responsible for animating the missiles and enemies.
function animate() {
  requestAnimationFrame(animate); // * Creating a recursive callbacks.
  ctx.clearRect(0, 0, canvas.width, canvas.height); // * For not showing the missile and projectiles as lines.
  player.draw(); // * Call the draw function to draw the player after each clear.
  missiles.forEach((missile) => {
    missile.update(); // * Change the x and y to make them move.
    // const dis = Math.hypot(player.x - enemy.x, player.y - enemy.y);
  });
  enemies.forEach((enemy, index) => {
    enemy.update(); // * Change the x and y to make them move.
    missiles.forEach((missile, ind) => {
      // * ↓ Calculating the distance between the missile and the enemy in the horizontal and vertical
      // * directions.
      const dis = Math.hypot(missile.x - enemy.x, missile.y - enemy.y);
      if (dis - missile.radius - enemy.radius < 1) {
        setTimeout(() => {
          // * To make push to the callback queue to be done after all the stuff.
          enemies.splice(index, 1);
          missiles.splice(ind, 1);
        }, 0);
      }
    });
  });
}

// ? Creating the function which is responsible for creating many enemies form many directions
function spawnEnemy() {
  setInterval(() => {
    // * to make an enemy every one second.
    const radius = Math.random() * (30 - 5) + 5; // * Enemies with a variety of sizes.
    let x, y;
    if (Math.random() < 0.5) {
      // * To get the enemies form every corner of the canvas
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    const color = "orange",
      // * Get the angle of the distance between the enemy and the center point to target the player object.
      angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    // * Adding the enemies to the array to render them all.
    enemies.push(new Enemies(x, y, radius, color, velocity));
  }, 1000);
}

// ? Create the event listener which will fire a missile at each click.
window.addEventListener("click", (e) => {
  // * The angel of the distance between the player and the cursor.
  let angle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle), // * The x velocity of moving towards the target.
    y: Math.sin(angle), // * The y velocity of moving towards the target.
  };
  missiles.push(
    // * Adding the Missiles to the array to render them all.
    new Missiles(canvas.width / 2, canvas.height / 2, 10, "green", velocity)
  );
});

// * Calling the animate function to move the elements in the arrays.
animate();
// * Calling the spawnEnemy function to create the different sizes of the enemies and many of them as well.
spawnEnemy();
