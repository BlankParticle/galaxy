<script lang="ts">
  import "../app.tw.css";
  import Navbar from "@components/Navbar.svelte";
  import Footer from "@components/Footer.svelte";
  const { data } = $props();
</script>

<div class="flex flex-col">
  <div class="my-4 px-2 md:my-10 md:px-0">
    <Navbar />
  </div>
  <slot />
  <div class="px-2 md:px-0">
    <Footer commitSha={data.commitSha} />
  </div>
</div>
