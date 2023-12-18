import { browser } from "$app/environment";

class WindowQuery {
  query: MediaQueryList | null = null;
  matches = $state(false);

  constructor(query: string) {
    if (!browser) return;
    this.query = window.matchMedia(query);
    this.matches = this.query.matches;
    this.query.addEventListener("change", ({ matches }) => {
      this.matches = matches;
    });
  }
  addCallback(callback: (matches: boolean) => void) {
    if (!browser) return;
    this.query?.addEventListener("change", ({ matches }) => {
      callback(matches);
    });
  }
}

const motionReduced = new WindowQuery("(prefers-reduced-motion: reduce)");
const prefersDark = new WindowQuery("(prefers-color-scheme: dark)");
export { motionReduced, prefersDark };
