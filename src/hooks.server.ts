import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) =>
  await resolve(event, {
    preload: ({ type, path }) => type === "css" || (type === "font" && path.includes("latin-wght")),
  });
