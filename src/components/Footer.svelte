<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="w-full bg-surface-200 px-2 dark:bg-surface-900">
  <footer
    class="mx-auto flex w-full max-w-screen-lg flex-col border-t py-3 dark:border-surface-800"
  >
    <div class="pb-6">
      <span class="h3 font-bold dark:text-surface-400">Social Links</span>
      <div
        class="flex flex-col *:w-fit hover:*:underline md:flex-row md:gap-3 dark:text-surface-500 hover:*:dark:text-surface-400"
      >
        <a href="/email">Email</a>
        <a href="/github">Github</a>
        <a href="/discord">Discord</a>
        <a href="/twitter">Twitter</a>
        <a href="/linkedin">LinkedIn</a>
        <a href="/hashnode">Hashnode</a>
        <a href="/devto">Dev.to</a>
        <a href="/myanimelist">MyAnimeList</a>
        <a href="/spotify">Spotify</a>
      </div>
    </div>
    <div class="flex flex-wrap justify-between text-sm font-medium dark:text-surface-500">
      <div>
        <a
          href="https://github.com/BlankParticle/galaxy/blob/master/LICENSE"
          target="_blank"
          class="hover:underline"
        >
          MIT License
        </a>
        &copy; 2023
        <a href="https://blankparticle.com" target="_blank" class="hover:underline">BlankParticle</a
        >
      </div>
      <div class="flex gap-1 truncate">
        Latest Deploy on
        <a
          href="/gh/galaxy/tree/{$page.data.commitSha}"
          target="_blank"
          class="flex items-center underline dark:text-surface-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            class="mr-1 fill-surface-700 dark:fill-surface-100"
          >
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
          BlankParticle/galaxy<span class="dark:text-surface-500"
            >#{$page.data.commitSha.substring(0, 7)}</span
          >
        </a>
      </div>
    </div>
  </footer>
</div>
