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
}

function CheckCollision(object) {
  let plength = platforms.length;
  let collision = false;
  // Iterate through platforms
  for (let i = 0; i < plength; i++) {
    // if pos + vel, collide
    if (
      platforms[i].x < object.x + object.width + object.velX &&
      platforms[i].x + platforms[i].width > object.x + object.velX &&
      platforms[i].y < object.y + object.height &&
      platforms[i].y + platforms[i].height > object.y
    ) {
      if (object.velX < 0)
        object.x = platforms[i].x + platforms[i].width;
      else
        object.x = platforms[i].x - object.width;
      object.velX = 0;
    }
    if (
      platforms[i].x < object.x + object.width &&
      platforms[i].x + platforms[i].width > object.x &&
      platforms[i].y < object.y + object.height + object.velY &&
      platforms[i].y + platforms[i].height > object.y + object.velY
    ) {
      if (object.velY < 0)
        object.y = platforms[i].y + platforms[i].height;
      else
        object.y = platforms[i].y - object.height;
      if (object.velY > 0) {
        collision = true;
      }
      object.velY = 0;
    }
  }
  object.onGround = collision;
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
