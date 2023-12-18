import type { Action } from "svelte/action";
import CanvasWorker from "./worker?worker";

class Canvas {
  private worker: Worker;
  private motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  constructor(canvas: HTMLCanvasElement) {
    this.worker = new CanvasWorker();

    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.play();
      } else {
        this.pause();
      }
    }).observe(canvas);

    new ResizeObserver(([entry]) => {
      this.resize(entry.contentRect.width, entry.contentRect.height);
    }).observe(canvas);

    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", ({ matches }) => {
      if (matches) {
        this.motionReduced = true;
        this.pause();
        this.clear();
      } else {
        this.motionReduced = false;
        this.play();
      }
    });

    const offscreenCanvas = canvas.transferControlToOffscreen();
    this.worker.postMessage({ type: "init", canvas: offscreenCanvas }, [offscreenCanvas]);
  }

  public play() {
    if (this.motionReduced) return;
    this.worker.postMessage({ type: "play" });
  }
  public pause() {
    this.worker.postMessage({ type: "pause" });
  }
  public clear() {
    this.worker.postMessage({ type: "clear" });
  }
  private resize(width: number, height: number) {
    this.worker.postMessage({ type: "resize", width, height });
  }
}

export default (function animateCanvas(node) {
  const canvas = new Canvas(node);
  setTimeout(() => node.style.removeProperty("opacity"), 1000);

  return {
    destroy() {
      canvas.pause();
      canvas.clear();
    },
  };
} satisfies Action<HTMLCanvasElement>);
