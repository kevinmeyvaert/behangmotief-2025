import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetcher } from "~/lib/api";
import { ALBUM } from "~/queries/wannabes";
import { AlbumQuery } from "~/types/wannabes.types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { post } = await fetcher<AlbumQuery>(ALBUM, {
    slug: params["*"],
  });
  return { post };
};

export default function Album() {
  const { post } = useLoaderData<typeof loader>();

  return <div className="container px-4 sm:px-0">Album</div>;
}
