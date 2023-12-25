/* 
  To Future me,
  We handle Errors in GET function only
*/

// Node.js Buffer type polyfill
declare const Buffer: {
  from: (str: string) => {
    toString: (encoding: string) => string;
  };
};

import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} from "$env/static/private";
import { accessTokenResponse, nowPlayingResponse } from "@lib/schemas/api.spotify";
import { $cached } from "@lib/utils/customRunes";
import { parseAsync } from "valibot";
import type { RequestHandler } from "./$types";

const getAccessToken = $cached(
  async () => {
    const basicAuthToken = Buffer.from(
      [SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET].join(":"),
    ).toString("base64");
    const res = await fetch(
      `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${SPOTIFY_REFRESH_TOKEN}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuthToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return (await parseAsync(accessTokenResponse, await res.json())).access_token;
  },
  /* Can be cached for like an hour, 3500 just to be safe */
  3500 * 1000,
);

const getNowPlaying = $cached(
  async () => {
    const token = await getAccessToken();
    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) {
      return { song: null };
    }
    return await parseAsync(nowPlayingResponse, await res.json());
  },
  /* 15 seconds is a decent time, no one needs to updated in realtime about my songs */
  15 * 1000,
);

export const GET: RequestHandler = async () => {
  try {
    return new Response(JSON.stringify(await getNowPlaying()), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Something Went Wrong", {
      status: 500,
    });
  }
};
