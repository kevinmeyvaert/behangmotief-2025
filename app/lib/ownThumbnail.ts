import { RelatedPostsQuery, SearchQuery } from "~/types/wannabes.types";

export const checkThumbnails = (
  album:
    | SearchQuery["posts"]["data"][number]
    | RelatedPostsQuery["sameArtist"]["data"][number]
    | RelatedPostsQuery["sameVenue"]["data"][number],
) => {
  if (album.thumbnail.photographer?.firstName !== "Kevin") {
    const kevThumbnail = album.images.filter(
      (i) => i.photographer?.firstName === "Kevin",
    )[0];
    return {
      ...album,
      thumbnail: {
        dimensions: album.thumbnail.dimensions,
        blurhash: kevThumbnail.blurhash,
        hires: kevThumbnail.resized,
      },
    };
  } else {
    return album;
  }
};
