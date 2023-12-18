<script lang="ts">
  import multiType from "@lib/actions/multiType";
  import animateCanvas from "@lib/canvas";
  import { motionReduced } from "@lib/utils/windowQuery.svelte";
  // These are the most popular greetings in the world
  // Sorry if I missed yours
  const alternateHellos = ["Namaste", "Konnichiwa", "Hola", "Bonjour"].map((text) => text + "!");
</script>

<canvas
  use:animateCanvas
  class="absolute top-0 z-[-1] h-44 w-full opacity-0 transition-opacity duration-0 ease-in-out dark:opacity-100 dark:duration-1000 md:h-72"
  style:opacity="0"
/>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1440 320"
  preserveAspectRatio="none"
  class="h-28 fill-surface-200 dark:fill-surface-900 md:h-40"
>
  <path
    d="M0,128L40,160C80,192,160,256,240,256C320,256,400,192,480,186.7C560,181,640,235,720,240C800,245,880,203,960,202.7C1040,203,1120,245,1200,234.7C1280,224,1360,160,1400,128L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
  />
</svg>

<div class="flex justify-center bg-surface-200 dark:bg-surface-900">
  <div class="flex h-[70vh] w-full max-w-screen-lg flex-col p-3 md:p-0">
    <div class="gradient-text flex flex-col from-primary-500 to-tertiary-500 py-2 text-left font-semibold">
      <span class="h2" use:multiType={{ alternateTexts: alternateHellos, disable: motionReduced.matches }}>Hello!</span>
      <span class="h1">It's Rahul Mishra</span>
      <span class="h3 mt-4 origin-left rotate-1 font-normal text-surface-600">
        {new Date().getFullYear() - 2005}yo
        <span class="gradient-text select-none from-primary-400 to-secondary-700">//</span>
        Indian
        <span class="gradient-text select-none from-primary-400 to-secondary-700">//</span>
        Student
      </span>
    </div>
    <div class="h4 mt-4 flex flex-col gap-1 dark:text-surface-400">
      <span>I am a Developer who lives on the internet building random things.</span>
      <span>
        I go by the name of
        <a
          class="animated-underline gradient-text from-primary-500 to-secondary-500 font-semibold"
          href="/gh"
          target="_blank"
        >
          BlankParticle
        </a> on the internet.
      </span>
      <span>
        And, Oh
        <span
          class="gradient-text from-warning-600 to-warning-700 font-semibold dark:from-warning-400 dark:to-warning-600"
          >I use Arch btw</span
        >
      </span>
    </div>
    <div class="mt-8 flex flex-wrap gap-2">
      <a
        href="/mail"
        class="social-link-button from-email-400 to-email-300 dark:from-email-500 dark:to-email-400"
        target="_blank"
        title="Email Me"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15.61 12c0 1.99-1.62 3.61-3.61 3.61c-1.99 0-3.61-1.62-3.61-3.61c0-1.99 1.62-3.61 3.61-3.61c1.99 0 3.61 1.62 3.61 3.61M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c2.424 0 4.761-.722 6.76-2.087l.034-.024l-1.617-1.879l-.027.017A9.494 9.494 0 0 1 12 21.54c-5.26 0-9.54-4.28-9.54-9.54c0-5.26 4.28-9.54 9.54-9.54c5.26 0 9.54 4.28 9.54 9.54a9.63 9.63 0 0 1-.225 2.05c-.301 1.239-1.169 1.618-1.82 1.568c-.654-.053-1.42-.52-1.426-1.661V12A6.076 6.076 0 0 0 12 5.93A6.076 6.076 0 0 0 5.93 12A6.076 6.076 0 0 0 12 18.07a6.02 6.02 0 0 0 4.3-1.792a3.9 3.9 0 0 0 3.32 1.805c.874 0 1.74-.292 2.437-.821c.719-.547 1.256-1.336 1.553-2.285c.047-.154.135-.504.135-.507l.002-.013c.175-.76.253-1.52.253-2.457c0-6.617-5.383-12-12-12"
          />
        </svg>
        <span class="hidden md:flex">Email</span>
      </a>
      <a
        href="/gh"
        class="social-link-button from-github-400 to-github-300 dark:from-github-500 dark:to-github-400"
        target="_blank"
        title="Follow me on GitHub"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
        <span class="hidden md:flex">GitHub</span>
      </a>
      <a
        href="/x"
        class="social-link-button from-twitter-400 to-twitter-300 dark:from-twitter-500 dark:to-twitter-400"
        target="_blank"
        title="Follow me on Twitter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M21.543 7.104c.015.211.015.423.015.636c0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041a4.93 4.93 0 0 1-4.6-3.42a4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148a13.98 13.98 0 0 0 10.15 5.144a4.929 4.929 0 0 1 8.39-4.49a9.868 9.868 0 0 0 3.128-1.196a4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549"
          />
        </svg>
        <span class="hidden md:flex">Twitter</span>
      </a>
      <a
        href="/dc"
        class="social-link-button from-discord-400 to-discord-300 dark:from-discord-500 dark:to-discord-400"
        target="_blank"
        title="Message Me on Discord"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03M8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418"
          />
        </svg>
        <span class="hidden md:flex">Discord</span>
      </a>
    </div>
  </div>
</div>

<svelte:head>
  <title>Home | Galaxy | BlankParticle</title>
  <meta name="description" content="Galaxy, The Glorified Personal Website of Rahul Mishra aka BlankParticle" />
</svelte:head>
