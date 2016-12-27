function Hunter (x, y) {
  this.x = x;
  this.y = y;
  this.velX = 0;
  this.velY = 0;
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
  this.Tick = function() {
    
  };
}
