document.addEventListener('keydown', KeyHandler);
document.addEventListener('keyup', KeyHandler);
document.addEventListener('mousedown', MouseHandler);
document.addEventListener('mouseup', MouseHandler);

function KeyHandler(e) {
  switch (e.code) {
    case "KeyD":
      runners[1].right = e.type === 'keydown' ? true : false;
      break;
    case "ArrowRight":
      runners[0].right = e.type === 'keydown' ? true : false;
      break;
    case "KeyA":
      runners[1].left = e.type === 'keydown' ? true : false;
      break;
    case "ArrowLeft":
      runners[0].left = e.type === 'keydown' ? true : false;
      break;
    case "KeyW":
      runners[1].up = e.type === 'keydown' ? true : false;
      break;
    case "ArrowUp":
      runners[0].up = e.type === 'keydown' ? true : false;
      break;
    case "KeyS":
      runners[1].down = e.type === 'keydown' ? true : false;
      break;
    case "ArrowDown":
      runners[0].down = e.type === 'keydown' ? true : false;
      break;
    case "Backquote":
      if (e.type === 'keydown')
        platforms.push(new Platform(runners[0].x - 500, runners[0].y + 100, 1000, 50));
      break;
  }
}

function MouseHandler (e) {

}
