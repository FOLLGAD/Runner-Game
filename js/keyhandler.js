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
      runner.down = e.type === 'keydown' ? true : false;
      break;
    case "Backquote":
      if (e.type === 'keydown')
        platforms.push(new Platform(runner.x, runner.y, 1000, 50));
      break;
  }
}
