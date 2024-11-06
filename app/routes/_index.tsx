import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { fetcher } from "~/lib/api";
import { POSTS } from "~/queries/wannabes";
import {
  Await,
  defer,
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { SearchQuery } from "~/types/wannabes.types";
import { FormEvent, Suspense } from "react";
import Masonry from "react-masonry-css";
import Pagination from "~/components/Pagination";
import { PostCard } from "~/components/PostCard";
import { checkThumbnails } from "~/lib/ownThumbnail";
import { MasonryLoadingState } from "~/components/MasonryLoadingState";

const POSTS_PER_PAGE = 15;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParam = url.searchParams.get("search");
  const pageParam = url.searchParams.get("page") ?? "1";
  const postsPromise = fetcher<SearchQuery>(POSTS, {
    start: (parseInt(pageParam) - 1) * POSTS_PER_PAGE,
    limit: POSTS_PER_PAGE,
    all: searchParam,
  });
  return defer({
    posts: postsPromise,
  });
};

import profile from "../images/profile.jpg";

export const meta: MetaFunction = () => {
  const title = "Behangmotief — Music & festival photographer";
  const description =
    "Behangmotief is a music and festival photographer known for vibrant, high-contrast images that capture the energy of live performances. With a fast, reliable turnaround, Behangmotief delivers dynamic visuals full of color and motion, turning every moment into an impactful story for artists, venues, and festivals.";
  return [
    { title },
    { name: "description", content: description },
    {
      name: "og:image",
      content: profile,
    },
    {
      name: "og:site_name",
      content: title,
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "og:description",
      content: description,
    },
    {
      name: "og:url",
      content: "https://behangmotief.be",
    },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchValue = (form.elements.namedItem("search") as HTMLInputElement)
      .value;
    if (searchValue) {
      navigate({
        pathname: "/",
        search: `?search=${encodeURIComponent(searchValue.trim())}&page=1`,
      });
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSearch}
        className="flex mb-5 w-full justify-center"
        key={searchParams.get("search")}
      >
        <input
          type="text"
          name="search"
          defaultValue={searchParams.get("search") ?? ""}
          placeholder="Search an artist or venue..."
          className="appearance-none rounded-none p-4 text-m bg-[white] w-full max-w-96 border-b-4 border-black"
        />
        <button type="submit" className="py-2 px-4">
          Search
        </button>
      </form>
      <main>
        <Suspense fallback={<MasonryLoadingState />}>
          <Await resolve={data.posts}>
            {({ posts }) => (
              <>
                <Masonry
                  breakpointCols={{
                    default: 3,
                    1023: 2,
                    767: 1,
                  }}
                  className="c-masonry"
                  columnClassName="c-masonry--grid-column"
                >
                  {posts.data.map(checkThumbnails).map((p) => (
                    <Link to={`/album/${p.slug}`} key={p.id}>
                      <PostCard
                        artist={p.artist.name}
                        venue={p.venue.name}
                        event={p.event?.name}
                        date={p.date}
                        thumbnail={p.thumbnail.hires}
                        dimensions={p.thumbnail.dimensions}
                        blurhash={p.thumbnail.blurhash}
                      />
                    </Link>
                  ))}
                </Masonry>
                <Pagination
                  limit={POSTS_PER_PAGE}
                  start={posts.pagination.start}
                  total={posts.pagination.total}
                  path={
                    searchParams.get("search")
                      ? `?search=${searchParams.get("search")}&page=[page]`
                      : `?page=[page]`
                  }
                />
              </>
            )}
          </Await>
        </Suspense>
      </main>
    </div>
  );
}
