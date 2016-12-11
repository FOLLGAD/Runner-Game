const canvas = document.getElementById('runner'),
      ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;
let lastDate,
    gravity = 5,
    map = {};
let runner = Runner();
map.height = 1200;

const images = {};
images.emil = new Image();
images.emil.src = "images/emil.png";

document.addEventListener('keydown', KeyHandler);
document.addEventListener('keyup', KeyHandler);

function KeyHandler(e) {
  switch (e.code) {
    case "KeyD":
    case "ArrowRight":
      runner.right = e.type === 'keydown' ? true : false;
      break;
    case "KeyA":
    case "ArrowLeft":
      runner.left = e.type === 'keydown' ? true : false;
      break;
    case "KeyW":
    case "ArrowUp":
      runner.up = e.type === 'keydown' ? true : false;
      break;
    case "KeyS":
    case "ArrowDown":
      break;
      runner.up = e.type === 'keydown' ? true : false;
  }
}

function Update() {
  let dt = Date.now() - lastDate;
  lastDate = Date.now();
  Tick();
  UpdateViewport();
  Draw();
  requestAnimationFrame(Update);
}

function Tick() {
  // if right/left & not left/right, move to right/left
  if (runner.right && !runner.left)
    runner.velX += runner.runSpeed;
  else if (runner.left && !runner.right)
    runner.velX += -runner.runSpeed;
  if (runner.up && (runner.onGround || Date.now() - runner.jumpTimer < 200)) {
    runner.velY = -runner.jumpSpeed;
    if (runner.onGround) runner.jumpTimer = Date.now();
  } else {
    runner.jumpTimer = 0;
  }
  // accelerate towards ground
  runner.velY += gravity;
  runner.x += runner.velX;
  // collision detection
  // if the runner would collide with y, set on ground and velY to zero
  if (runner.y + runner.velY > map.height) {
    runner.y = map.height;
    runner.velY = 0;
    runner.onGround = true;
  } else {
    runner.y += runner.velY;
    runner.onGround = false;
  }
  // simulate friktion
  runner.velX *= 0.8;
  runner.velY *= 0.95;
}
let viewport = {};
function UpdateViewport() {
  ctx.restore();
  ctx.save();
  viewport.x = runner.x - canvas.width / 2;
  viewport.y = runner.y - canvas.height / 2;
  viewport.x = viewport.x < 0 ? 0 : viewport.x;
  viewport.y = viewport.y < 0 ? 0 : viewport.y;
  ctx.translate(-viewport.x, -viewport.y);
}

function Draw () {
  ctx.clearRect(viewport.x, viewport.y, canvas.width, canvas.height);
  // ctx.drawImage(images.emil, runner.x, runner.y);
  ctx.fillStyle = '#546e7a';
  ctx.fillRect(runner.x, runner.y, runner.width, runner.height);
  ctx.fillStyle = '#e57373';
  ctx.fillRect(canvas.width, canvas.height, 100, 20);
}

Update();
