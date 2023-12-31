<script lang="ts">
  import type { NowPlayingResponse } from "@lib/schemas/api.spotify";
  import { fade } from "svelte/transition";
  let nowPlaying = $state<NowPlayingResponse>();
  let timeout: number | null = null;
  let playingPromise = $state(Promise.resolve());
  let trackElement = $state<HTMLDivElement>()!;
  let playButton = $state<HTMLButtonElement>()!;
  let playing = $state(false);

  const fetchSong = () => {
    fetch("/api/now-playing")
      .then((res) => res.json())
      .then(async (res: NowPlayingResponse) => {
        await playingPromise;
        nowPlaying = res;
        timeout = setTimeout(() => fetchSong(), 15000);
      })
      .catch(async () => {
        await playingPromise;
        nowPlaying?.song && (nowPlaying.song = null);
        timeout = null;
      });
  };

  const playPreview = async () => {
    if (!nowPlaying?.song?.previewUrl) return;
    const defaults = { duration: 300, easing: "ease-out", fill: "forwards" } as const;
    let audio = new Audio(nowPlaying.song.previewUrl);
    await new Promise((resolve) => (audio.onloadeddata = resolve));
    await playButton.animate({ scale: ["1", "0"] }, defaults).finished;
    await audio.play();
    playButton.style.display = "none";
    playing = true;
    await trackElement.animate(
      { width: ["1%", "100%"] },
      { duration: 30000, easing: "linear", fill: "forwards" },
    ).finished;
    playButton.style.display = "flex";
    await trackElement.animate({ width: ["100%", "0"] }, defaults).finished;
    playing = false;
    await playButton.animate({ scale: ["0", "1"] }, defaults).finished;
  };

  $effect(() => {
    fetchSong();
    return () => {
      timeout && clearTimeout(timeout);
    };
  });
</script>

<div class="mx-auto h-28 w-80 shadow-lg">
  {#if nowPlaying?.song}
    <div
      style:background-image="url({nowPlaying.song.albumArt})"
      style:color={nowPlaying.song.color}
      class="h-full w-full rounded-lg bg-cover bg-center"
      transition:fade={{ duration: 200 }}
    >
      <div
        class="flex h-full w-full flex-col rounded-lg bg-[#121212]/60 p-3 bg-blend-multiply dark:bg-[#121212]/70"
      >
        <div class="truncate text-lg font-bold hover:underline">
          {nowPlaying.song.name}
        </div>
        <div class="truncate text-sm font-medium">
          {#each nowPlaying.song?.artists as artist, i}
            <a href={artist.url} target="_blank" rel="noopener noreferrer" class="hover:underline">
              {artist.name}
            </a>{i < nowPlaying.song?.artists.length - 1 ? ", " : ""}
          {/each}
        </div>
        <div class="flex flex-1 items-center">
          <div
            class="h-2 rounded-full bg-[currentColor]"
            class:w-0={!playing}
            bind:this={trackElement}
          ></div>
          <button
            class="flex"
            onclick={() => (playingPromise = playPreview())}
            title="Play"
            bind:this={playButton}
            disabled={!nowPlaying.song.previewUrl}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m10.938 14.98l3.837-2.47q.292-.183.292-.508t-.292-.512l-3.837-2.47q-.298-.212-.618-.037t-.32.546v4.942q0 .371.32.546q.32.175.618-.036M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  {:else}
    <div class="flex h-full w-full items-center justify-center">
      <div class="text-center">
        <div class="text-lg font-bold">🎶 Not Listening to Anything</div>
        <div class="text-sm font-medium">🗡️ Check back later!</div>
      </div>
    </div>
  {/if}
</div>
