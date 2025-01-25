import { Link } from '@remix-run/react';
import Masonry from 'react-masonry-css';
import { PostCard } from './PostCard';
import { checkThumbnails } from '~/lib/ownThumbnail';
import { SearchQuery } from '~/types/wannabes.types';

interface Props {
  posts: SearchQuery['posts'];
}

// The Masonry component uses js to account for the different breakpoints.
// Here i wrap the Masonry component into different divs for the different breakpoints.
// This way the browser correctly paints the masonry layout with the default number of columns.
// This fixes the issue where the masonry always flashed with default number of columns on load.
export const HomepageMasonry = ({ posts }: Props) => {
  const renderCards = (posts: SearchQuery['posts']) =>
    posts.data.map(checkThumbnails).map((p) => (
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
    ));

  return (
    <>
      <div className='hidden lg:block'>
        <Masonry
          breakpointCols={{
            default: 3,
          }}
          className='c-masonry'
          columnClassName='c-masonry--grid-column'
        >
          {renderCards(posts)}
        </Masonry>
      </div>
      <div className='hidden md:block lg:hidden'>
        <Masonry
          breakpointCols={{
            default: 2,
          }}
          className='c-masonry'
          columnClassName='c-masonry--grid-column'
        >
          {renderCards(posts)}
        </Masonry>
      </div>
      <div className='md:hidden'>{renderCards(posts)}</div>
    </>
  );
};
