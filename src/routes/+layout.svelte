<script lang="ts">
  import "../app.tw.css";
  import Navbar from "@components/Navbar.svelte";
  import Footer from "@components/Footer.svelte";
</script>

<div class="flex flex-col">
  <div class="my-4 px-2 md:my-10">
    <Navbar />
  </div>
  <slot />
  <Footer />
</div>
