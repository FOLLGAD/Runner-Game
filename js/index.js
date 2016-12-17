let runners = [];
runners.push(new Runner());

function Update() {
  let dt = Date.now() - lastDate;
  lastDate = Date.now();
  Tick();
  UpdateCanvasDimensions();
  UpdateViewport();
  Draw();
  requestAnimationFrame(Update);
}

function Tick() {
  for (let i = 0; i < runners.length; i++)
    runners[i].Tick();
}

function CheckCollision(object) {
  let plength = platforms.length;
  // Iterate through platforms
  for (let i = 0; i < plength; i++) {
    let colX = IsCollidingX(object, platforms[i]);
    if (colX) {
      if (object.velX < 0) {
        object.x = platforms[i].x + platforms[i].width;
      } else {
        object.x = platforms[i].x - object.width;
      }
      object.velX = 0;
    }
  }
  let touchedGround = false;
  for (let i = 0; i < plength; i++) {
    let colY = IsCollidingY(object, platforms[i]);
    if (colY) {
      if (object.velY < 0) {
        console.log("moved", object.y - platforms[i].y + platforms[i].height);
        object.y = platforms[i].y + platforms[i].height;
      } else {
        console.log("moved", object.y - platforms[i].y - object.height);
        object.y = platforms[i].y - object.height;
        touchedGround = true;
      }
      object.velY = 0;
    }
  }
  object.onGround = touchedGround;
}

function IsCollidingX(object, titanic, offsetX = 0, offsetY = 0) {
  // If pos + vel, collide
    return (
      titanic.x < object.x + object.width + object.velX + offsetX &&
      titanic.x + titanic.width > object.x + object.velX + offsetX &&
      titanic.y < object.y + object.height + offsetY &&
      titanic.y + titanic.height > object.y + offsetY
    );
}
function IsCollidingY(object, titanic, offsetX = 0, offsetY = 0) {
  // If pos + vel, collide
  return (
    titanic.x < object.x + object.width + offsetX &&
    titanic.x + titanic.width > object.x + offsetX &&
    titanic.y < object.y + object.height + object.velY + offsetY &&
    titanic.y + titanic.height > object.y + object.velY + offsetY
  );
}

function UpdateViewport() {
  let padding = 30;
  viewport.height = canvas.height;
  viewport.width = canvas.width;
  ctx.restore();
  ctx.save();
  viewport.x = runners[0].x - canvas.width / 2;
  viewport.y = runners[0].y - canvas.height / 2;
  viewport.x = viewport.x < 0 - padding ? 0 - padding : viewport.x;
  viewport.x = viewport.x + viewport.width > map.width + padding ? map.width - viewport.width + padding : viewport.x;
  viewport.y = viewport.y < 0 - padding ? 0 - padding : viewport.y;
  viewport.y = viewport.y + viewport.height > map.height + padding ? map.height - viewport.height + padding : viewport.y;
  ctx.translate(-viewport.x, -viewport.y);
}

function Draw () {
  ctx.clearRect(viewport.x, viewport.y, canvas.width, canvas.height);
  ctx.fillStyle = '#e57373';
  for (let i = 0; i < platforms.length; i++) {
    ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
  }
  ctx.fillRect(0, map.height, 30000, 10);
  // ctx.drawImage(images.emil, runner.x, runner.y);
  ctx.fillStyle = '#546e7a';
  for (let i = 0; i < runners.length; i++)
    ctx.fillRect(runners[i].x, runners[i].y, runners[i].width, runners[i].height);
}

Update();
