import type { PageServerLoad } from "./$types";
import type { Config } from "@sveltejs/adapter-vercel";
import { DEV_TO_API_TOKEN, ISR_BYPASS_TOKEN } from "$env/static/private";
import latestBlogsSchema from "@lib/schemas/api.blogs";
import { parse } from "valibot";

export const load = (async () => {
  const response = await fetch("https://dev.to/api/articles/me/published?per_page=3", {
    headers: {
      "api-key": DEV_TO_API_TOKEN,
    },
  });
  if (!response.ok) {
    return { error: "Blogs API Unavailable" };
  }
  const rawData = await response.json();
  try {
    const blogData = parse(latestBlogsSchema, rawData);
    return { blogData };
  } catch (e) {
    console.error(e);
    return { error: "Blogs API Unavailable" };
  }
}) satisfies PageServerLoad;

export const config: Config = {
  isr: {
    expiration: 60 * 24, // 24 hours,
    bypassToken: ISR_BYPASS_TOKEN,
  },
};
