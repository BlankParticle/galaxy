import type { LayoutServerLoad } from "./$types";
import { VERCEL_GIT_COMMIT_SHA } from "$env/static/private";

export const load: LayoutServerLoad = () => ({
  commitSha: VERCEL_GIT_COMMIT_SHA,
});
