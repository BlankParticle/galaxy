import random from "@lib/utils/random";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const colors = [
  "#3d59a1",
  "#7aa2f7",
  "#7dcfff",
  "#2ac3de",
  "#0db9d7",
  "#89ddff",
  "#b4f9f8",
  "#394b70",
  "#bb9af7",
  "#ff007c",
  "#9d7cd8",
  "#ff9e64",
  "#e0af68",
  "#9ece6a",
  "#73daca",
  "#41a6b5",
  "#1abc9c",
  "#f7768e",
  "#db4b4b",
];

class CanvasWorker {
  private state: "playing" | "paused" = "paused";
  private ctx: OffscreenCanvasRenderingContext2D;
  private _numberOfParticles: number = 0;
  private particles: Particle[] = [];
  private resizeTimeout: number | null = null;

  constructor(canvas: OffscreenCanvas) {
    this.ctx = canvas.getContext("2d")!;
  }

  get numberOfParticles() {
    return this._numberOfParticles;
  }

  set numberOfParticles(numberOfParticles: number) {
    this._numberOfParticles = numberOfParticles;

    this.clear();
    this.particles = new Array(numberOfParticles).fill(null).map(() => ({
      x: random.float(0, this.ctx.canvas.width),
      y: random.float(0, this.ctx.canvas.height),
      vx: random.float(-0.1, 0.1),
      vy: random.float(-0.1, 0.1),
      radius: random.float(0.1, 1.5),
      color: random.choice(colors),
    }));
  }

  public play() {
    if (this.state === "playing") return;
    this.state = "playing";
    this.draw();
  }

  public pause() {
    if (this.state === "paused") return;
    this.state = "paused";
  }

  private draw() {
    if (this.state === "paused") return;
    this.clear();
    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0) {
        particle.x = this.ctx.canvas.width;
      }
      if (particle.x > this.ctx.canvas.width) {
        particle.x = 0;
      }
      if (particle.y < 0) {
        particle.y = this.ctx.canvas.height;
      }
      if (particle.y > this.ctx.canvas.height) {
        particle.y = 0;
      }

      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
    requestAnimationFrame(() => this.draw());
  }

  public resize(width: number, height: number) {
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = null;
      this.numberOfParticles = Math.floor((width * height) / 1000);
    }, 500);
  }
  public clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

let canvasWorker: CanvasWorker;

self.onmessage = (
  e: MessageEvent<
    | { type: "init"; canvas: OffscreenCanvas }
    | { type: "play" | "pause" | "clear" }
    | { type: "resize"; width: number; height: number }
  >,
) => {
  switch (e.data.type) {
    case "init":
      canvasWorker = new CanvasWorker(e.data.canvas);
      break;
    case "play":
      canvasWorker.play();
      break;
    case "pause":
      canvasWorker.pause();
      break;
    case "clear":
      canvasWorker.clear();
      break;
    case "resize":
      canvasWorker.resize(e.data.width, e.data.height);
      break;
  }
};
