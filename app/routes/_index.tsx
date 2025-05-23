import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

import {
  Await,
  defer,
  useLoaderData,
  useRevalidator,
  useRouteError,
  useSearchParams,
} from '@remix-run/react';
import { Suspense } from 'react';
import Pagination from '~/components/Pagination';
import { fetcher } from '~/lib/api';
import { POSTS } from '~/queries/wannabes';
import type { SearchQuery } from '~/types/wannabes.types';

const POSTS_PER_PAGE = 15;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParam = url.searchParams.get('search');
  const pageParam = url.searchParams.get('page') ?? '1';
  const postsPromise = fetcher<SearchQuery>(POSTS, {
    start: (parseInt(pageParam) - 1) * POSTS_PER_PAGE,
    limit: POSTS_PER_PAGE,
    all: searchParam,
  });
  return defer(
    {
      posts: postsPromise,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=600',
      },
    },
  );
};

import { HomepageMasonry } from '~/components/HomepageMasonry';
import { HomepageMasonryLoadingState } from '~/components/HomepageMasonryLoadingState';
import { NoSearchResults } from '~/components/NoSearchResults';
import { Search } from '~/components/Search';
import profile from '../images/profile.jpg';
import { Header } from '~/components/Header';

export const meta: MetaFunction = () => {
  const title = 'Behangmotief — Music & festival photographer';
  const description =
    'Behangmotief is a music and festival photographer known for vibrant, high-contrast images that capture the energy of live performances. With a fast, reliable turnaround, Behangmotief delivers dynamic visuals full of color and motion, turning every moment into an impactful story for artists, venues, and festivals.';
  return [
    { title },
    { name: 'description', content: description },
    {
      name: 'og:image',
      content: profile,
    },
    {
      name: 'og:site_name',
      content: title,
    },
    {
      name: 'og:title',
      content: title,
    },
    {
      name: 'og:description',
      content: description,
    },
    {
      name: 'og:url',
      content: 'https://behangmotief.be',
    },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();
  const revalidator = useRevalidator();

  return (
    <div className='container'>
      <Search />
      <main>
        <div className='py-20 flex items-center justify-center flex-col'>
          <h1 className='text-4xl font-bold'>Something went wrong!</h1>
          <p className='text-gray-500 mb-5'>{(error as Error).message}</p>
          <button
            className='flex items-center justify-center bg-black text-white px-4 min-h-10'
            onClick={revalidator.revalidate}
            disabled={revalidator.state === 'loading'}
          >
            Try again
          </button>
        </div>
      </main>
    </div>
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <>
      <Header />
      <div className='container'>
        <Search />
        <main>
          <Suspense fallback={<HomepageMasonryLoadingState />}>
            <Await resolve={data.posts}>
              {({ posts }) => {
                const hasPosts = posts.pagination.total > 0;
                if (!hasPosts) {
                  return <NoSearchResults searchQuery={searchParams.get('search')} />;
                }
                return (
                  <>
                    <HomepageMasonry posts={posts} />
                    <Pagination
                      limit={POSTS_PER_PAGE}
                      start={posts.pagination.start}
                      total={posts.pagination.total}
                      path={
                        searchParams.get('search')
                          ? `?search=${searchParams.get('search')}&page=[page]`
                          : `?page=[page]`
                      }
                    />
                  </>
                );
              }}
            </Await>
          </Suspense>
        </main>
      </div>
    </>
  );
}
