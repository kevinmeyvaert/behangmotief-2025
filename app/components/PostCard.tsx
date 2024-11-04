import { useState } from "react";
import { Blurhash } from "react-blurhash";
import { aspectRatio, validatedBlurhash } from "~/lib/blurhash";
import { formatPostDate } from "~/lib/date";
import { Dimensions } from "~/types/wannabes.types";

interface Props {
  artist: string;
  venue: string;
  date: string;
  thumbnail: string;
  dimensions: Dimensions;
  blurhash: string;
}

export const PostCard = ({
  artist,
  venue,
  date,
  thumbnail,
  dimensions,
  blurhash,
}: Props) => {
  const [isError, setIsError] = useState(false);
  const fallbackWidth = dimensions?.width || 800;
  const fallbackHeight = dimensions?.height || 800;

  return (
    <figure className="relative flex flex-col bg-[white] mb-5">
      <Blurhash
        hash={validatedBlurhash(blurhash)}
        width={`${fallbackWidth}px`}
        resolutionX={50}
        resolutionY={50}
        punch={1}
        aria-hidden="true"
        className="absolute"
        style={{
          maxWidth: "100%",
          paddingTop: `${aspectRatio(fallbackWidth, fallbackHeight)}%`,
        }}
      />
      <img
        className="w-full absolute"
        src={`https://images.wannabes.be/S=W800,H800,PD2/${thumbnail}`}
        alt={`${artist} at ${venue}`}
        width={300}
        onError={() => {
          setIsError(true);
        }}
        style={{
          maxWidth: "100%",
          display: isError ? "none" : "block",
        }}
        loading="lazy"
      />
      <figcaption className="absolute bottom-0 flex justify-between items-end w-full text-black py-2 px-4 text-white drop-shadow gap-4">
        <p>{formatPostDate(date)}</p>
        <p className="text-l">
          {artist} — {venue}
        </p>
      </figcaption>
    </figure>
  );
};
