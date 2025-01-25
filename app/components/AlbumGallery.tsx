import Lightbox from 'yet-another-react-lightbox';
import { AlbumQuery } from '~/types/wannabes.types';
import { useMemo, useState } from 'react';

import 'yet-another-react-lightbox/styles.css';
import { aspectRatio } from '~/lib/blurhash';
import { formatPostDate } from '~/lib/date';
import { AlbumMasonry } from './AlbumMasonry';

interface Props {
  post: AlbumQuery['post'];
}

export const AlbumGallery = ({ post }: Props) => {
  const [index, setIndex] = useState(-1);
  const images = useMemo(
    () => post.images.filter((i) => i.photographer?.firstName === 'Kevin'),
    [post.images],
  );
  const slides = useMemo(
    () =>
      images.map((image) => ({
        src: `https://images.wannabes.be/S=W800,H800,PD2/${image.hires}`,
        width: image.dimensions?.width,
        height: image.dimensions?.height,
        srcSet: [
          {
            src: `https://images.wannabes.be/S=W320,H320,PD1/${image.hires}`,
            width: 320,
            height: 320 * aspectRatio(image.dimensions?.width, image.dimensions?.height),
          },
          {
            src: `https://images.wannabes.be/S=W640,H640,PD1/${image.hires}`,
            width: 640,
            height: 640 * aspectRatio(image.dimensions?.width, image.dimensions?.height),
          },
          {
            src: `https://images.wannabes.be/S=W1024,H1024,PD1/${image.hires}`,
            width: 1024,
            height: 1024 * aspectRatio(image.dimensions?.width, image.dimensions?.height),
          },
          {
            src: `https://images.wannabes.be/S=W1500,H1500,PD1/${image.hires}`,
            width: 1500,
            height: 1500 * aspectRatio(image.dimensions?.width, image.dimensions?.height),
          },
        ],
      })),
    [images],
  );

  return (
    <article>
      <header className='text-center mb-5'>
        <h1 className='text-4xl font-bold'>{post.artist.name}</h1>
        <p className='text-gray-500'>
          <time>{formatPostDate(post.date)}</time> – {post.venue.name}
        </p>
      </header>
      <AlbumMasonry images={images} onSetIndex={setIndex} />
      <Lightbox index={index} slides={slides} open={index >= 0} close={() => setIndex(-1)} />
    </article>
  );
};
