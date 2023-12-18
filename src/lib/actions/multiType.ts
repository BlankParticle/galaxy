import type { Action } from "svelte/action";

export default (function multiType(node, params) {
  const { alternateTexts, startDelay = 2500, typeDelay = 150 } = params;
  let disable = params.disable || false;

  const nodeText = node.textContent;
  nodeText && alternateTexts.push(nodeText);
  let currentTextIndex = nodeText ? alternateTexts.length - 1 : 0;
  let currentTextLength = nodeText ? nodeText.length : 0;

  const cursor = `<span class="motion-safe:animate-blink motion-reduce:hidden select-none text-primary-500">_</span>`;
  const textSpan = document.createElement("span");
  textSpan.innerText = nodeText || "";
  node.innerHTML = "";
  node.appendChild(textSpan);
  node.insertAdjacentHTML("beforeend", cursor);

  function type() {
    if (disable) {
      return;
    }
    if (currentTextLength < alternateTexts[currentTextIndex].length) {
      textSpan.innerText = alternateTexts[currentTextIndex].slice(0, ++currentTextLength);
      setTimeout(type, typeDelay);
    } else {
      setTimeout(erase, typeDelay + startDelay);
    }
  }

  function erase() {
    if (disable) {
      return;
    }
    if (currentTextLength > 0) {
      textSpan.innerText = alternateTexts[currentTextIndex].slice(0, --currentTextLength);
      setTimeout(erase, typeDelay);
    } else {
      currentTextIndex = (currentTextIndex + 1) % alternateTexts.length;
      setTimeout(type, typeDelay);
    }
  }

  setTimeout(() => {
    erase();
  }, startDelay);

  return {
    update(newParams) {
      if (newParams.disable) {
        node.innerHTML = nodeText || "";
        disable = true;
      } else {
        disable = false;
        node.innerHTML = "";
        textSpan.innerText = nodeText || "";
        node.appendChild(textSpan);
        node.insertAdjacentHTML("beforeend", cursor);
        currentTextIndex = nodeText ? alternateTexts.length - 1 : 0;
        currentTextLength = nodeText ? nodeText.length : 0;
        type();
      }
    },
    destroy() {
      node.innerHTML = nodeText || "";
    },
  };
} satisfies Action<
  HTMLElement,
  { alternateTexts: string[]; startDelay?: number; typeDelay?: number; disable?: boolean }
>);
