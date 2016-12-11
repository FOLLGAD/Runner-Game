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
      break;
      runner.up = e.type === 'keydown' ? true : false;
  }
}
