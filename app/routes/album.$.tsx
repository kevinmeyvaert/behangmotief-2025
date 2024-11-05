import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { AlbumGallery } from "~/components/AlbumGallery";
import { fetcher } from "~/lib/api";
import { ALBUM } from "~/queries/wannabes";
import { AlbumQuery } from "~/types/wannabes.types";

const descriptions = (venue?: string, artist?: string) => [
  `Explore an electrifying collection of live photos capturing ${artist}'s unforgettable performance at ${venue}. Taken by Behangmotief, a music photographer known for vibrant, high-energy shots.`,
  `Experience the energy and excitement of ${artist} live at ${venue} through this exclusive photo collection by Behangmotief, capturing every thrilling moment of the performance.`,
  `Get front and center to ${artist}'s performance at ${venue} with these dynamic photos by Behangmotief, offering a vivid glimpse into the event’s unforgettable atmosphere.`,
  `Step into the live music experience with Behangmotief’s photography collection of ${artist} at ${venue}. Each photo captures the intensity and spirit of this memorable performance.`,
  `Relive the excitement of ${venue} through Behangmotief's lens with a stunning array of photos from ${artist}'s live set. High-energy moments and crowd passion, all in one album.`,
  `Behangmotief presents a vivid gallery of ${artist} performing at ${venue}. From the stage energy to the crowd vibes, these photos bring you into the heart of the action.`,
  `See ${artist} like never before with Behangmotief’s photography at ${venue}. This photo collection captures the electric atmosphere and unforgettable moments from the show.`,
  `Dive into the vibrant atmosphere of ${venue} with Behangmotief's striking photos of ${artist}. These images showcase the energy and intensity of live music at its finest.`,
  `Captured by Behangmotief, this photo album of ${artist} at ${venue} offers a unique view of the live experience, with every image highlighting the energy and passion of the crowd.`,
  `Discover the magic of live music with Behangmotief's photo collection of ${artist} at ${venue}. Each shot reflects the essence of music performance and the thrill of the audience.`,
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { post } = await fetcher<AlbumQuery>(ALBUM, {
    slug: params["*"],
  });
  const description = descriptions(post.venue.name, post.artist.name)[
    Math.floor(
      Math.random() * descriptions(post.venue.name, post.artist.name).length,
    )
  ];
  return { post, description };
};

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  const title = `${data?.post.artist.name} live at ${data?.post.venue.name} | Behangmotief — Music & festival photographer`;
  return [
    {
      title,
    },
    {
      name: "description",
      content: data?.description,
    },
    {
      name: "og:image",
      content: data?.post.thumbnail.resized,
    },
    {
      name: "og:site_name",
      content: "Behangmotief — Music- & festivalphotographer",
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "og:description",
      content: data?.description,
    },
    {
      name: "og:url",
      content: `https://behangmotief.be${location.pathname}`,
    },
  ];
};

export default function Album() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <main className="container px-4 sm:px-0">
      <AlbumGallery post={post} />
    </main>
  );
}
