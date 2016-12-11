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
  // accelerate towards ground
  runner.velY += runner.gravity;
  runner.x += runner.velX;
  // collision detection
  // if the runner would collide with y, set on ground and velY to zero
  if (runner.y + runner.velY > map.height - runner.height) {
    runner.y = map.height - runner.height;
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

function CheckCollision() {
  let plength = platforms.length;
  for (let i = 0; i < plength; i++) {
    if (
      platform[i].x > Runner.x + Runner.width &&
      platform[i].x + platform[i].width > Runner.x &&
      platform[i].y > Runner.y + Runner.height &&
      platform[i].y + platform[i].height > Runner.y
    ) {

    } else if (
      platform[i].x > Runner.x + Runner.width &&
      platform[i].x + platform[i].width > Runner.x &&
      platform[i].y > Runner.y + Runner.height &&
      platform[i].y + platform[i].height > Runner.y
    ) {

    }
  }
}

function Draw () {
  ctx.clearRect(viewport.x, viewport.y, canvas.width, canvas.height);
  ctx.fillRect(0, map.height, 3000, 10);
  // ctx.drawImage(images.emil, runner.x, runner.y);
  ctx.fillStyle = '#546e7a';
  ctx.fillRect(runner.x, runner.y, runner.width, runner.height);
  ctx.fillStyle = '#e57373';
  ctx.fillRect(canvas.width, canvas.height, 100, 20);
}

Update();
