import { useState } from "react";
import { Blurhash } from "react-blurhash";
import { validatedBlurhash } from "~/lib/blurhash";
import { formatPostDate } from "~/lib/date";

interface Props {
  description: string;
  date: string;
  thumbnail: string;
  blurhash: string;
  event?: string;
}

export const RelatedCard = ({
  description,
  date,
  thumbnail,
  blurhash,
}: Props) => {
  const [isError, setIsError] = useState(false);

  return (
    <figure className="relative flex flex-col bg-[white]">
      <Blurhash
        hash={validatedBlurhash(blurhash)}
        width="100%"
        resolutionX={50}
        resolutionY={50}
        punch={1}
        aria-hidden="true"
        className="absolute"
        style={{
          maxWidth: "100%",
          paddingTop: "100%",
        }}
      />
      <img
        className="w-full absolute drop-shadow"
        srcSet={`
          https://images.wannabes.be/S=W320,H320,PD1/C=SQ/${thumbnail} 320w,
          https://images.wannabes.be/S=W640,H640,PD1/C=SQ/${thumbnail} 640w,
          https://images.wannabes.be/S=W768,H768,PD1/C=SQ/${thumbnail} 768w,
          https://images.wannabes.be/S=W1024,H1024,PD1/C=SQ/${thumbnail} 1024w`}
        sizes="
          (max-width: 767px) 100vw,
          (max-width: 1023px) 50vw,
          (min-width: 1024px) (max-width: 1535px) 33vw,
          (min-width: 1536px) 25vw
        "
        src={`https://images.wannabes.be/S=W800,H800,PD2/C=SQ/${thumbnail}`}
        alt={description}
        width={800}
        height={800}
        onError={() => {
          setIsError(true);
        }}
        style={{
          maxWidth: "100%",
          display: isError ? "none" : "block",
        }}
      />
      <figcaption className="absolute bottom-0 flex justify-between items-end w-full text-black py-2 px-4 text-white gap-4 text-sm">
        <p>{formatPostDate(date)}</p>
        <p>{description}</p>
      </figcaption>
    </figure>
  );
};
