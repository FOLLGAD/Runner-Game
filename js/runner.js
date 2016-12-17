function Runner() {
  // States
  this.x = 0;
  this.y = 0;
  this.velX = 0;
  this.velY = 0;
  this.up = false;
  this.down = false;
  this.left = false;
  this.right = false;
  this.onGround = true;

  // Settings
  this.hp = 100;
  this.width = 32;
  this.height = 32;
  this.runSpeed = 2;
  this.jumpSpeed = 40;
  this.jumpTimer = 0;
  this.gravity = 5;
  this.groundFriction = 0.8;
  this.airFriction = 0.95;

  this.topVelX = 0;
  this.topVelY = 0;

  // Methods
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
    CheckCollision(this);

    this.x += this.velX;
    this.y += this.velY;


    // accelerate towards ground
    this.velY += this.gravity;


    if (this.y + this.velY > map.height - this.height) {
      this.y = map.height - this.height;
      this.velY = 0;
      this.onGround = true;
    }
    // Simulate friction/airdrag
    this.velX *= this.groundFriction;
    this.velY *= this.airFriction;
    this.topVelX = Math.max(this.topVelX, this.velX);
    this.topVelY = Math.max(this.topVelY, this.velY);
  };
}
