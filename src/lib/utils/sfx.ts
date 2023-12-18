import { browser } from "$app/environment";
const audioMap = new Map<string, HTMLAudioElement>();

export const playOnce = (src: string) => {
  if (!browser) return Promise.resolve();
  let audio: HTMLAudioElement;
  if (audioMap.has(src)) {
    audio = audioMap.get(src)!;
    audio.currentTime = 0;
  } else {
    audio = new Audio(src);
    audioMap.set(src, audio);
  }
  audio.play();
  return new Promise<void>((resolve) => {
    audio.onended = () => {
      resolve();
    };
  });
};
