const canvas = document.getElementById('runner'),
      ctx = canvas.getContext('2d');
let lastDate,
    platforms = [],
    viewport = {};

let mouseX, mouseY;

let MODE = -1;

const images = {};
images.emil = new Image();
images.emil.src = "public/emil.png";

function UpdateCanvasDimensions() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

function MouseMove(e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
}
