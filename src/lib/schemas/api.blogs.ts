import { type Output, array, object, string, transform } from "valibot";

const latestBlogsSchema = array(
  transform(
    object({ title: string(), published_at: string(), url: string(), canonical_url: string() }),
    ({ canonical_url, url, ...rest }) => ({
      devto_link: url,
      hashnode_link: canonical_url,
      ...rest,
    }),
  ),
);
export default latestBlogsSchema;
export type LatestBlogsType = Output<typeof latestBlogsSchema>;
