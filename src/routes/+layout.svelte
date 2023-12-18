<script lang="ts">
  import Navbar from "@components/Navbar.svelte";
  import "../app.tw.css";
</script>

<div class="flex flex-col">
  <div class="my-4 px-2 md:my-10 md:px-0">
    <Navbar />
  </div>
  <slot />
</div>
