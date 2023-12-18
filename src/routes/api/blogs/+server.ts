import type { RequestHandler } from "./$types";
import { DEV_TO_API_TOKEN } from "$env/static/private";
import { json } from "@sveltejs/kit";
import latestBlogsSchema from "@lib/schemas/api.blogs";
import { parse } from "valibot";
import { dev } from "$app/environment";

/**
 * dev.to API Wrapper
 *
 * I used this one as I get both Dev.to and Hashnode links from one API
 */
export const GET = (async () => {
  const response = await fetch("https://dev.to/api/articles/me/published?per_page=3", {
    headers: {
      "api-key": DEV_TO_API_TOKEN,
    },
  });
  if (!response.ok) {
    return json({ error: "Blogs API Unavailable" }, { status: 500 });
  }
  const rawData = await response.json();
  try {
    const data = parse(latestBlogsSchema, rawData);
    return json(data, {
      headers: {
        // There is no way I am writing a blog every hour
        "cache-control": `public, max-age=${dev ? "5" : "3600"}`,
      },
    });
  } catch {
    return json({ error: "Blogs API Unavailable" }, { status: 500 });
  }
}) satisfies RequestHandler;
