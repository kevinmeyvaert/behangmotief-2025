import { AlbumImage } from "./AlbumImage";

import Masonry from "react-masonry-css";
import { AlbumQuery } from "~/types/wannabes.types";

interface Props {
  images: AlbumQuery["post"]["images"];
  onSetIndex: (index: number) => void;
}

// The Masonry component uses js to account for the different breakpoints.
// Here i wrap the Masonry component into different divs for the different breakpoints.
// This way the browser correctly paints the masonry layout with the default number of columns.
// This fixes the issue where the masonry always flashed with default number of columns on load.
export const AlbumMasonry = ({ images, onSetIndex }: Props) => {
  return (
    <>
      <div className="hidden lg:block">
        <Masonry
          breakpointCols={{
            default: 4,
          }}
          className="c-masonry"
          columnClassName="c-masonry--grid-column"
        >
          {images.map((image, index) => (
            <AlbumImage
              key={image.blurhash}
              image={image}
              index={index}
              onSetIndex={onSetIndex}
            />
          ))}
        </Masonry>
      </div>
      <div className="hidden md:block lg:hidden">
        <Masonry
          breakpointCols={{
            default: 3,
          }}
          className="c-masonry"
          columnClassName="c-masonry--grid-column"
        >
          {images.map((image, index) => (
            <AlbumImage
              key={image.blurhash}
              image={image}
              index={index}
              onSetIndex={onSetIndex}
            />
          ))}
        </Masonry>
      </div>
      <div className="md:hidden">
        <Masonry
          breakpointCols={{
            default: 2,
          }}
          className="c-masonry"
          columnClassName="c-masonry--grid-column"
        >
          {images.map((image, index) => (
            <AlbumImage
              key={image.blurhash}
              image={image}
              index={index}
              onSetIndex={onSetIndex}
            />
          ))}
        </Masonry>
      </div>
    </>
  );
};
