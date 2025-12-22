const canvas = document.createElement("canvas");
canvas.id = "snow-canvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let width, height;
let snowflakes = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createSnowflakes(count = 120) {
  snowflakes = [];
  for (let i = 0; i < count; i++) {
    snowflakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      d: Math.random() * 1 + 0.5,
    });
  }
}
createSnowflakes();

function drawSnow() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  for (let flake of snowflakes) {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
  }
  ctx.fill();
  moveSnow();
}

function moveSnow() {
  for (let flake of snowflakes) {
    flake.y += flake.d;
    flake.x += Math.sin(flake.y * 0.01);

    if (flake.y > height) {
      flake.y = -10;
      flake.x = Math.random() * width;
    }
  }
}

function animate() {
  drawSnow();
  requestAnimationFrame(animate);
}
animate();
