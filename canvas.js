const START_LENGTH = 100;
const START_WIDTH = 40;
const RATIO = 1.4;
const COLORS = [
  "hsl(0, 0%, 100%)",
  "hsl(283.45, 100%, 94.31%)",
  "hsl(281.38, 100%, 88.63%)",
  "hsl(280.69, 100%, 82.94%)",
  "hsl(278.97, 100%, 77.06%)",
  "hsl(278.26, 100%, 70.78%)",
  "hsl(277.3, 100%, 63.73%)",
  "hsl(279.53, 100%, 50%)",
];

let angle = 29;

class Canvas {
  constructor() {
    this.elem = document.getElementById("canvas");
    this.ctx = this.elem.getContext("2d");
    this.onResize();
  }

  onResize() {
    let rect = this.ctx.canvas.parentNode.getBoundingClientRect();
    this.ctx.canvas.width = rect.width;
    this.ctx.canvas.height = rect.height;
    this.width = rect.width;
    this.height = rect.height;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    update();
  }
}

const canvas = new Canvas();

function update() {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Do some updates
  draw();
}

function drawBranch(length, width) {
  canvas.ctx.lineWidth = width;
  canvas.ctx.beginPath();
  canvas.ctx.moveTo(0, 0);
  canvas.ctx.lineTo(0, -length);
  canvas.ctx.stroke();
}

angleRatio = 0.00001;
function drawBranches(order) {
  if (angle < 32) {
    angle += angleRatio;
  }

  let ratio = Math.pow(RATIO, order);
  let newLength = START_LENGTH / ratio;
  let newWidth = START_WIDTH / ratio;
  if (order > 7) {
    return;
  }
  canvas.ctx.strokeStyle = COLORS[order];
  canvas.ctx.save();
  canvas.ctx.rotate(angle);
  drawBranch(newLength, newWidth);
  canvas.ctx.save();
  canvas.ctx.translate(0, -newLength);
  drawBranches(order + 1);
  canvas.ctx.restore();
  canvas.ctx.restore();
  canvas.ctx.save();
  canvas.ctx.rotate(-angle);
  drawBranch(newLength, newWidth);
  canvas.ctx.save();
  canvas.ctx.translate(0, -newLength);
  drawBranches(order + 1);
  canvas.ctx.restore();
  canvas.ctx.restore();
}

function draw() {
  canvas.ctx.globalCompositeOperation = "lighter";
  canvas.ctx.globalAlpha = 1;
  canvas.ctx.strokeStyle = "white";
  canvas.ctx.save();
  canvas.ctx.translate(canvas.width / 2, canvas.height);
  drawBranch(START_LENGTH, START_WIDTH);
  canvas.ctx.save();
  canvas.ctx.translate(0, -START_LENGTH);
  drawBranches(0);
  canvas.ctx.restore();
  canvas.ctx.restore();
}

canvas.animate();

window.addEventListener("resize", () => {
  canvas.onResize();
});
