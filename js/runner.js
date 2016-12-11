function Runner() {
  this.x = 0;
  this.y = 0;
  this.velX = 0;
  this.velY = 0;
  this.up = false;
  this.down = false;
  this.left = false;
  this.right = false;
  this.hp = 100;
  this.width = 32;
  this.height = 32;
  this.runSpeed = 2;
  this.jumpSpeed = 40;
  this.jumpTimer = 0;
  this.onGround = true;
}
