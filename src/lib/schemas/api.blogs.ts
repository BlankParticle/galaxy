import { format } from "date-fns";
import { array, object, string, transform, type Output } from "valibot";

const latestBlogs = array(
  transform(
    object({ title: string(), published_at: string(), url: string(), canonical_url: string() }),
    ({ title, canonical_url, url, published_at }) => ({
      title,
      devToLink: url,
      hashnodeLink: canonical_url,
      publishedOn: format(new Date(published_at), "do MMM yyyy"),
    }),
  ),
);
export default latestBlogs;
export type LatestBlogs = Output<typeof latestBlogs>;
