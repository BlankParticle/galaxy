import { type Output, array, object, string, transform } from "valibot";
import { format } from "date-fns";

const latestBlogsSchema = array(
  transform(
    object({ title: string(), published_at: string(), url: string(), canonical_url: string() }),
    ({ canonical_url, url, published_at, ...rest }) => ({
      devto_link: url,
      hashnode_link: canonical_url,
      published_on: format(new Date(published_at), "do MMM yyyy"),
      ...rest,
    }),
  ),
);
export default latestBlogsSchema;
export type LatestBlogsType = Output<typeof latestBlogsSchema>;
