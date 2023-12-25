import { DEV_TO_API_TOKEN, ISR_BYPASS_TOKEN } from "$env/static/private";
import latestBlogs from "@lib/schemas/api.blogs";
import type { Config } from "@sveltejs/adapter-vercel";
import { safeParse } from "valibot";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const response = await fetch("https://dev.to/api/articles/me/published?per_page=3", {
    headers: {
      "api-key": DEV_TO_API_TOKEN,
    },
  });

  if (!response.ok) {
    return { error: "Blogs API Unavailable" };
  }

  const blogData = safeParse(latestBlogs, await response.json());
  return blogData.success ? { blogData: blogData.output } : { error: "Blogs API Unavailable" };
}) satisfies PageServerLoad;

export const config: Config = {
  isr: {
    expiration: 60 * 24, // 24 hours,
    bypassToken: ISR_BYPASS_TOKEN,
  },
};
