import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { Header } from "~/components/Header";

import { fetcher } from "~/lib/api";
import { POSTS } from "~/queries/wannabes";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { SearchQuery } from "~/types/wannabes.types";
import { FormEvent } from "react";
import Masonry from "react-masonry-css";
import Pagination from "~/components/Pagination";
import { PostCard } from "~/components/PostCard";
import { checkThumbnails } from "~/lib/ownThumbnail";
import { Footer } from "~/components/Footer";

const POSTS_PER_PAGE = 15;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParam = url.searchParams.get("search");
  const pageParam = url.searchParams.get("page") ?? "1";
  const { posts } = await fetcher<SearchQuery>(POSTS, {
    start: (parseInt(pageParam) - 1) * POSTS_PER_PAGE,
    limit: POSTS_PER_PAGE,
    all: searchParam,
  });
  return { posts };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Behangmotief — Music- & festivalphotographer" },
    { name: "description", content: "Music- & festivalphotographer" },
  ];
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchValue = (form.elements.namedItem("search") as HTMLInputElement)
      .value;
    if (searchValue) {
      navigate(`?search=${encodeURIComponent(searchValue.trim())}&page=1`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <form
        onSubmit={handleSearch}
        className="flex gap-2 mb-5 w-full justify-center"
        key={searchParams.get("search")}
      >
        <input
          type="text"
          name="search"
          defaultValue={searchParams.get("search") ?? ""}
          placeholder="Search an artist or venue..."
          className="appearance-none rounded-none p-4 text-m bg-[white] w-full max-w-96 border-b-4 border-black"
        />
        <button type="submit" style={{ padding: "8px 16px", fontSize: "16px" }}>
          Search
        </button>
      </form>
      <main className="container highlights">
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
            <Link to="#" key={p.id}>
              <PostCard
                artist={p.artist.name}
                venue={p.venue.name}
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
      </main>
      <Footer />
    </div>
  );
}
