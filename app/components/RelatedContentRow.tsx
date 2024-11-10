import { Link } from "@remix-run/react";
import { RelatedCard } from "./RelatedCard";
import { checkThumbnails } from "~/lib/ownThumbnail";
import { RelatedPostFieldsFragment } from "~/types/wannabes.types";
import classNames from "classnames";

interface Props {
  relatedPosts: RelatedPostFieldsFragment[];
  title: string;
  postId: string;
  className?: string;
  type: "artist" | "venue";
}

export const RelatedContentRow = ({
  relatedPosts,
  title,
  postId,
  className,
  type,
}: Props) => (
  <section className={classNames("container", className)}>
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {relatedPosts
        .filter((p) => p.id !== postId)
        .map(checkThumbnails)
        .slice(0, 4)
        .map((post) => (
          <Link to={`/album/${post.slug}`} key={post.id}>
            <RelatedCard
              blurhash={post.thumbnail.blurhash}
              thumbnail={post.thumbnail.hires}
              description={
                type === "venue" ? post.artist.name : post.venue.name
              }
              date={post.date}
            />
          </Link>
        ))}
    </div>
  </section>
);
