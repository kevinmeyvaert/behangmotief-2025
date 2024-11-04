import { useDraggable } from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/core/dist/types";
import { CSSProperties } from "react";

interface DraggableImageProps {
  id: string;
  src: string;
  initialPosition: Coordinates;
  width: number;
  height: number;
  zIndex: number;
  description: string;
}

export const DraggableImage = ({
  id,
  src,
  initialPosition,
  width,
  height,
  zIndex,
  description,
}: DraggableImageProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  // Set initial position and adjust with current drag transform
  const style: CSSProperties = {
    position: "absolute",
    left: initialPosition.x + (transform?.x || 0),
    top: initialPosition.y + (transform?.y || 0),
    width: width + "px",
    height: height + "px",
    cursor: "move",
    boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.3)",
    zIndex: zIndex,
    border: "5px solid black",
  };

  return (
    <img
      data-tooltip-id={id}
      data-tooltip-content={description}
      ref={setNodeRef}
      src={src}
      alt={`Draggable ${id}`}
      {...listeners}
      {...attributes}
      style={style}
    />
  );
};
