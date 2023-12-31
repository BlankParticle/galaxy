import { array, boolean, nullable, object, string, transform, type Output } from "valibot";

export const nowPlayingResponse = transform(
  object({
    item: transform(
      object({
        album: transform(
          object({
            images: array(
              object({
                url: string(),
              }),
            ),
          }),
          ({ images: [image] }) => image.url,
        ),
        artists: transform(
          array(object({ name: string(), external_urls: object({ spotify: string() }) })),
          (artists) =>
            artists.map(({ name, external_urls: { spotify } }) => ({ name, url: spotify })),
        ),
        name: string(),
        preview_url: nullable(string()),
        external_urls: object({ spotify: string() }),
      }),
      ({ name, album, artists, external_urls, preview_url }) => ({
        name,
        albumArt: album,
        artists,
        url: external_urls.spotify,
        color: "",
        previewUrl: preview_url,
      }),
    ),
    is_playing: boolean(),
  }),
  ({ item, is_playing }) => ({ song: is_playing ? item : null }),
);

export type NowPlayingResponse = Output<typeof nowPlayingResponse>;

export const accessTokenResponse = object({
  access_token: string(),
});

export type AccessTokenResponse = Output<typeof accessTokenResponse>;
