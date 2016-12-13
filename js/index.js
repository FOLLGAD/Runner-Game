let runner = new Runner();

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

  // Checks collision detection ofc
  CheckCollision();

  runner.x += runner.velX;
  runner.y += runner.velY;


  // accelerate towards ground
  runner.velY += runner.gravity;


  if (runner.y + runner.velY > map.height - runner.height) {
    runner.y = map.height - runner.height;
    runner.velY = 0;
    runner.onGround = true;
  }
  // Simulate friction/airdrag
  runner.velX *= 0.8;
  runner.velY *= 0.95;
}

function CheckCollision() {
  let plength = platforms.length;
  let collision = false;
  // Iterate through platforms
  for (let i = 0; i < plength; i++) {
    // if pos + vel, collide
    if (
      platforms[i].x < runner.x + runner.width + runner.velX &&
      platforms[i].x + platforms[i].width > runner.x + runner.velX &&
      platforms[i].y < runner.y + runner.height &&
      platforms[i].y + platforms[i].height > runner.y
    ) {
      if (runner.velX < 0)
        runner.x = platforms[i].x + platforms[i].width;
      else
        runner.x = platforms[i].x - runner.width;
      runner.velX = 0;
    }
    if (
      platforms[i].x < runner.x + runner.width &&
      platforms[i].x + platforms[i].width > runner.x &&
      platforms[i].y < runner.y + runner.height + runner.velY &&
      platforms[i].y + platforms[i].height > runner.y + runner.velY
    ) {
      if (runner.velY < 0)
        runner.y = platforms[i].y + platforms[i].height;
      else
        runner.y = platforms[i].y - runner.height;
      if (runner.velY > 0) {
        collision = true;
      }
      runner.velY = 0;
    }
  }
  runner.onGround = collision;
}

function UpdateViewport() {
  let padding = 30;
  viewport.height = canvas.height;
  viewport.width = canvas.width;
  ctx.restore();
  ctx.save();
  viewport.x = runner.x - canvas.width / 2;
  viewport.y = runner.y - canvas.height / 2;
  viewport.x = viewport.x < 0 - padding ? 0 - padding : viewport.x;
  viewport.x = viewport.x + viewport.width > map.width + padding ? map.width - viewport.width + padding : viewport.x;
  viewport.y = viewport.y < 0 - padding ? 0 - padding : viewport.y;
  viewport.y = viewport.y + viewport.height > map.height + padding ? map.height - viewport.height + padding : viewport.y;
  ctx.translate(-viewport.x, -viewport.y);
}

function Draw () {
  ctx.clearRect(viewport.x, viewport.y, canvas.width, canvas.height);
  for (let i = 0; i < platforms.length; i++) {
    ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
  }
  ctx.fillRect(0, map.height, 30000, 10);
  // ctx.drawImage(images.emil, runner.x, runner.y);
  ctx.fillStyle = '#546e7a';
  ctx.fillRect(runner.x, runner.y, runner.width, runner.height);
  ctx.fillStyle = '#e57373';
  ctx.fillRect(canvas.width, canvas.height, 100, 20);
}

Update();
