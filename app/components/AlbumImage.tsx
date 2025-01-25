import { Blurhash } from 'react-blurhash';
import { aspectRatio, validatedBlurhash } from '~/lib/blurhash';
import { AlbumQuery } from '~/types/wannabes.types';

interface Props {
  image: AlbumQuery['post']['images'][number];
  index: number;
  onSetIndex: (index: number) => void;
}

export const AlbumImage = ({ image, index, onSetIndex }: Props) => {
  const fallbackWidth = image.dimensions?.width || 800;
  const fallbackHeight = image.dimensions?.height || 800;
  return (
    <button
      key={image.blurhash}
      className='relative flex flex-col bg-[white] mb-5 w-full'
      onClick={() => onSetIndex(index)}
    >
      <Blurhash
        hash={validatedBlurhash(image.blurhash)}
        width={`${fallbackWidth}px`}
        height={'100%'}
        resolutionX={50}
        resolutionY={50}
        punch={1}
        aria-hidden='true'
        className='absolute'
        style={{
          maxWidth: '100%',
          paddingTop: `${aspectRatio(fallbackWidth, fallbackHeight)}%`,
        }}
      />
      <img
        src={`https://images.wannabes.be/S=W800,H800,PD2/${image.hires}`}
        className='w-full absolute drop-shadow'
        width={image.dimensions?.width}
        height={image.dimensions?.height}
      />
    </button>
  );
};
