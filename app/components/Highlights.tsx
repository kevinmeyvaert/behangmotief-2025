import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Fragment, useId, useState } from "react";
import { homeImages } from "~/config/homeImages.config";
import { DraggableImage } from "./DraggableImage";
import { Tooltip } from "react-tooltip";

export const Highlights = () => {
  const [positions, setPositions] = useState(homeImages);
  const id = useId();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedId = active.id;

    // Set the zIndex of the dragged item to be the highest
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.id === draggedId
          ? {
              ...position,
              zIndex: Math.max(...prevPositions.map((p) => p.zIndex)) + 1,
            }
          : position,
      ),
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const draggedId = active.id;
    // Calculate new position based on drag delta
    setPositions((prevPositions) =>
      prevPositions.map((position) => {
        return position.id === draggedId
          ? {
              ...position,
              x: position.x + delta.x,
              y: position.y + delta.y,
            }
          : position;
      }),
    );
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      autoScroll={false}
      id={id}
    >
      <section className="container relative h-[1220px]">
        {positions.map((position) => {
          return (
            <Fragment key={position.id}>
              <DraggableImage
                id={position.id}
                src={position.url}
                initialPosition={{
                  x: position.x,
                  y: position.y,
                }}
                width={position.width}
                height={position.height}
                zIndex={position.zIndex}
                description={position.description}
              />
              <Tooltip id={position.id} style={{ zIndex: 1000 }} />
            </Fragment>
          );
        })}
      </section>
    </DndContext>
  );
};
