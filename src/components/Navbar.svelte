<script lang="ts">
  import { onMount } from "svelte";
  import ThemeSwitch from "./ThemeSwitch.svelte";
  import { motionReduced } from "@lib/utils/windowQuery.svelte";

  let swinging = $state(false);

  const swing = async () => {
    const chars = Array.from(
      document.querySelector("[data-swing]")?.children || [],
    ) as HTMLElement[];
    if (swinging || motionReduced.matches) {
      return chars.forEach((char) => char.classList.remove("hidden"));
    }
    swinging = true;
    await Promise.all(
      chars.map((char, i) => {
        setTimeout(() => char.classList.remove("hidden"), i * 55);
        return char.animate(
          [
            { transform: "translateY(0) rotate(-5deg)" },
            { transform: "translateY(-10px) rotate(0deg)" },
            { transform: "translateY(0) rotate(10deg)" },
            { transform: "translateY(0) rotate(0deg)" },
          ],
          {
            easing: "ease-out",
            duration: 800,
            delay: i * 50,
          },
        ).finished;
      }),
    );
    swinging = false;
  };

  onMount(() => {
    swing();
  });
</script>

<nav
  class="border-surface-400-500-token mx-auto flex h-16 w-full max-w-screen-lg items-center border bg-surface-100/15 px-4 shadow-lg backdrop-blur-sm rounded-token dark:bg-surface-800/15"
>
  <a
    class="no-tap-highlight anchor flex h-fit items-center text-xl font-bold no-underline"
    href="/"
    title="Go to Home Page"
    onmouseenter={() => swing()}
    data-swing
  >
    {#each "BlankParticle" as char}
      <span class="hidden select-none">{char}</span>
    {/each}
  </a>
  <div class="flex-1"></div>
  <ThemeSwitch />
</nav>
