import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const redirectMap: Record<string, string> = {
  "(gh|github)(.+)?": "https://github.com/BlankParticle$2",
  "(myanimelist|mal)": "https://myanimelist.net/profile/BlankParticle",
  "(twitter|x)": "https://twitter.com/blankparticle",
  "(e|g)?mail": "mailto:hello@blankparticle.in",
  "(discord|dc)": "https://discord.com/users/1096392763144159252",
  "(blog)": "https://blog.blankparticle.in",
  "(linkedin)": "https://www.linkedin.com/in/blankparticle",
  "(spotify)": "https://open.spotify.com/user/31krf3flzpa44udfgkc5a5xrqn7y",
  "(hashnode)": "https://hashnode.com/@BlankParticle",
  "(devto)": "https://dev.to/blankparticle",
};

export const GET = (({ params: { rewrites } }) => {
  for (const [pattern, target] of Object.entries(redirectMap)) {
    const re = new RegExp(`^${pattern}$`);
    if (re.test(rewrites)) {
      redirect(301, rewrites.replace(re, target));
    }
  }
  error(404, { message: "Not found" });
}) satisfies RequestHandler;
