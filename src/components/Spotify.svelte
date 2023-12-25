<script lang="ts">
  import type { NowPlayingResponse } from "@lib/schemas/api.spotify";
  let nowPlaying = $state<NowPlayingResponse>();
  let timeout: number | null;

  const fetchSong = () => {
    fetch("/api/now-playing")
      .then((res) => res.json())
      .then((res) => {
        nowPlaying = res;
        timeout = setTimeout(() => fetchSong(), 15000);
      })
      .catch(() => {
        nowPlaying?.song && (nowPlaying.song = null);
        timeout = null;
      });
  };

  $effect(() => {
    fetchSong();
    return () => {
      timeout && clearTimeout(timeout);
    };
  });
</script>

<div
  class="mx-auto w-3/4 rounded-lg bg-surface-100 px-2 py-3 shadow-lg md:w-60 dark:bg-surface-800"
>
  <div class="flex items-center">
    {#if nowPlaying?.song}
      <img class="h-10 w-10 rounded-full" src={nowPlaying.song.albumArt} alt="Album cover" />
    {:else}
      <div class="h-10 w-10 rounded-full bg-surface-300 dark:bg-surface-700" />
    {/if}
    <div class="ml-2 overflow-hidden">
      <svelte:element
        this={nowPlaying?.song?.name ? "a" : "p"}
        class="text-gray-800 dark:text-gray-200 text-sm font-medium"
        class:hover:underline={!!nowPlaying?.song?.name}
        href={nowPlaying?.song?.url}
      >
        {nowPlaying ? (nowPlaying.song ? nowPlaying.song.name : "Not Playing") : "Loading..."}
      </svelte:element>
      <p class="text-gray-500 dark:text-gray-400 truncate text-xs">
        {#if nowPlaying?.song}
          {#each nowPlaying.song.artists as artist, i}
            <a class="hover:underline" href={artist.url} target="_blank" rel="noopener noreferrer">
              {artist.name}
            </a>{#if i !== nowPlaying.song.artists.length - 1}{", "}
            {/if}
          {/each}
        {:else}
          <!-- Placeholder To prevent layout shift -->
          &nbsp;
        {/if}
      </p>
    </div>
  </div>
</div>
