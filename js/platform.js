function Platform(x, y, width, height = 10, deadly = false) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.deadly = deadly;
}

function SpawnPlatform(x = 0, y = 0, width = 32, height = 32, deadly = false) {
  platforms.push(new Platform(x, y, width, height, deadly));
}
