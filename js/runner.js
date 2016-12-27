function Runner() {
  // States
  this.up = false;
  this.down = false;
  this.left = false;
  this.right = false;
  this.onGround = false;
  this.topVelX = 0;
  this.topVelY = 0;

  // Settings
  this.width = 32;
  this.height = 32;
  this.runSpeed = 2;
  this.jumpSpeed = 40;
  this.jumpTimer = 0;
  this.gravity = 5;
  this.groundFriction = 0.8;
  this.airFriction = 0.95;

  // Methods
  this.Respawn = () => {
    this.x = 0;
    this.y = 0;
    this.velX = 0;
    this.velY = 0;
    this.hp = 100;
  };
  this.Respawn();

  this.Tick = () => {
    // if right/left & not left/right, move to right/left
    if (this.right && !this.left)
      this.velX += this.runSpeed;
    else if (this.left && !this.right)
      this.velX += -this.runSpeed;
    if (this.up && (this.onGround || Date.now() - this.jumpTimer < 200)) {
      this.velY = -this.jumpSpeed;
      if (this.onGround) this.jumpTimer = Date.now();
    } else {
      this.jumpTimer = 0;
    }
    // Checks collision detection ofc
    this.CheckCollision();
    // accelerate towards ground
    this.velY += this.gravity;
    if (this.y + this.velY > map.height - this.height) {
      this.y = map.height - this.height;
      this.velY = 0;
      this.onGround = true;
    }
    // Simulate ground friction / air drag
    this.velX *= this.groundFriction;
    this.velY *= this.airFriction;
    this.topVelX = Math.max(this.topVelX, this.velX);
    this.topVelY = Math.max(this.topVelY, this.velY);
  };
  this.CheckCollision = () => {
    let plength = platforms.length,
        touchedGround = false,
        colX = false,
        colY = false,
        tomoveX = this.x,
        tomoveY = this.y;

    for (let i = 0; i < plength; i++) {
      if (IsCollidingX(this, platforms[i])) {
        if (this.velX < 0) {
          if (!IsColliding({x: platforms[i].x + platforms[i].width, y: this.y, width: this.width, height: this.height}, platforms[i]))
            tomoveX = Math.abs(tomoveX - this.x) < Math.abs(platforms[i].x + platforms[i].width - this.x) ? platforms[i].x + platforms[i].width : tomoveX;
        } else if (this.velX > 0) {
          if (!IsColliding({x: platforms[i].x - this.width, y: this.y, width: this.width, height: this.height}, platforms[i]))
            tomoveX = Math.abs(tomoveX - this.x) < Math.abs(platforms[i].x - this.width - this.x) ? platforms[i].x - this.width : tomoveX;
        }
        if (platforms[i].deadly) {
          this.Respawn();
        }
        colX = true;
      }
    }
    for (let i = 0; i < plength; i++) {
      if (IsCollidingY(this, platforms[i])) {
        if (this.velY < 0) {
          if (!IsColliding({x: this.x, y: platforms[i].y + platforms[i].height, width: this.width, height: this.height}, platforms[i]))
            tomoveY = Math.abs(tomoveY - this.y) < Math.abs(platforms[i].y + platforms[i].height - this.y) ? platforms[i].y + platforms[i].height : tomoveY;
        } else if (this.velY > 0) {
          if (!IsColliding({x: this.x, y: platforms[i].y - this.height, width: this.width, height: this.height}, platforms[i])) {
            tomoveY = Math.abs(tomoveY - this.y) < Math.abs(platforms[i].y - this.height - this.y) ? platforms[i].y - this.height : tomoveY;
            touchedGround = true;
          }
        }
        if (platforms[i].deadly) {
          this.Respawn();
        }
        colY = true;
      }
    }
    this.onGround = touchedGround;
    this.x = tomoveX;
    this.y = tomoveY;
    if (colX)
      this.velX = 0;
    else
      this.x += this.velX;
    if (colY)
      this.velY = 0;
    else
      this.y += this.velY;
  };
}
