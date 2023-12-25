<script lang="ts">
  import { onMount } from "svelte";
  import { spring } from "svelte/motion";
  import { motionReduced, prefersDark } from "@lib/utils/windowQuery.svelte";
  import { playOnce } from "@lib/utils/sfx";

  let isDarkMode = $state(false);
  const label = $derived(`Switch to ${isDarkMode ? "light" : "dark"} mode`);

  const iconSpring = spring(
    {
      centerX: 30,
      centerY: 0,
      totalRotate: -40,
      centerSize: 3,
      rayRadius: 0,
    },
    {
      stiffness: 0.05,
      damping: 0.12,
      precision: 0.005,
    },
  );

  const radialPositionSpring = spring(new Array<number>(6).fill(9), {
    stiffness: 0.05,
    damping: 0.2,
  });

  $effect(() => {
    iconSpring.set(
      isDarkMode
        ? {
            centerX: 13,
            centerY: 3,
            totalRotate: 35,
            centerSize: 9.45,
            rayRadius: -0.2,
          }
        : {
            centerX: 30,
            centerY: 0,
            totalRotate: 90,
            centerSize: 5.5,
            rayRadius: 1.8,
          },
      { hard: motionReduced.matches },
    );
    for (let i = 0; i < 6; i++) {
      setTimeout(
        () =>
          radialPositionSpring.update(
            (arr) => {
              arr[i] = isDarkMode ? 0 : 9;
              return arr;
            },
            {
              hard: motionReduced.matches,
            },
          ),
        i * (motionReduced.matches ? 0 : 100),
      );
    }
  });

  const rays = $derived(
    new Array(6).fill(0).map((_, i) => {
      const angle = (i * 360) / 6 - 90;
      const cx = $radialPositionSpring[i] * Math.cos((angle * Math.PI) / 180) + 14;
      const cy = $radialPositionSpring[i] * Math.sin((angle * Math.PI) / 180) + 14;
      return [cx, cy];
    }),
  );

  const changeThemeMode = (forceTo?: string) => {
    const mode =
      forceTo || (document.documentElement.classList.contains("dark") ? "light" : "dark");
    !forceTo && playOnce(`/media/switch-${mode === "dark" ? "off" : "on"}.mp3`);
    isDarkMode = mode === "dark";
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.style.colorScheme = mode;
    localStorage.setItem("theme", mode);
    window.dispatchEvent(new CustomEvent("theme:change", { detail: { theme: mode } }));
  };

  onMount(() => {
    isDarkMode = document.documentElement.classList.contains("dark");
    prefersDark.addCallback((matches) => {
      changeThemeMode(matches ? "dark" : "light");
    });
  });
</script>

<svelte:window onkeyup={({ key, altKey }) => altKey && key === "t" && changeThemeMode()} />

<button
  onclick={() => changeThemeMode()}
  class="no-tap-highlight text-secondary-500-400-token p-2 transition-colors duration-200 ease-in-out rounded-token hover:bg-primary-500/10 dark:hover:bg-primary-400/10"
  aria-label={label}
  title={label}
>
  <svg width="35" height="35" viewBox="0 0 28 28" fill="none">
    <mask id="theme-switch-icon-mask">
      <rect width="28" height="28" fill="white" />
      <circle cx={$iconSpring.centerX} cy={$iconSpring.centerY} r="8.6" fill="black" />
    </mask>
    <circle
      cx="14"
      cy="14"
      r={Math.abs($iconSpring.centerSize)}
      fill="currentColor"
      mask="url(#theme-switch-icon-mask)"
      class="origin-center"
      style:rotate="{$iconSpring.totalRotate}deg"
    />
    <g>
      {#each rays as [cx, cy]}
        <circle {cx} {cy} r={Math.max($iconSpring.rayRadius, 0)} fill="currentColor" />
      {/each}
    </g>
  </svg>
</button>
