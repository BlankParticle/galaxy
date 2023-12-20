<script lang="ts">
  import type { LatestBlogsType } from "@lib/schemas/api.blogs";
  const { blogs } = $props<{ blogs: LatestBlogsType }>();
</script>

<div class="gradient-text h3 mb-1 from-tertiary-400 to-tertiary-500 font-bold">My Latest Blog Posts</div>
{#each blogs as blog}
  <div class="mb-6 flex w-fit flex-col px-1">
    <span class="mt-1 min-w-[75%] font-bold md:min-w-[50ch]">{blog.title}</span>
    <span class="mt-1 min-w-[60%] font-semibold leading-none md:min-w-[20ch] dark:text-surface-600">
      Published on {blog.published_on}
    </span>
    <div class="mt-1 flex min-w-[60%] gap-4 font-semibold md:min-w-[30ch]">
      <a
        href={blog.hashnode_link}
        target="_blank"
        class="animated-underline flex items-center gap-1 text-tertiary-700 dark:text-tertiary-400"
      >
        Read on Hashnode
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6q0-.425.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17q-.425 0-.712-.288T16 16z"
          />
        </svg>
      </a>
      <a
        href={blog.devto_link}
        target="_blank"
        class="animated-underline flex items-center gap-1 text-tertiary-700 dark:text-tertiary-400"
      >
        Read on dev.to
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6q0-.425.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17q-.425 0-.712-.288T16 16z"
          />
        </svg>
      </a>
    </div>
  </div>
{/each}
<div class="mb-10">
  <a
    href="/blog"
    target="_blank"
    class="animated-underline flex w-fit items-center gap-1 font-semibold text-tertiary-700 dark:text-tertiary-400"
  >
    View All
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentColor" d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z" />
    </svg>
  </a>
</div>
