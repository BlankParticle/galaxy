declare global {
  namespace App {
    interface Error {
      message: string;
    }
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
  declare interface WindowEventMap {
    "theme:change": CustomEvent<{ theme: string }>;
  }
}

export {};
