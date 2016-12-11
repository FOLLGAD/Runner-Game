const canvas = document.getElementById('runner'),
      ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;
let lastDate,
    platforms = [],
    viewport = {};

const images = {};
images.emil = new Image();
images.emil.src = "public/emil.png";
