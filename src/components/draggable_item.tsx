import { useDrop, useDrag, DragSourceMonitor } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";
import { useRef, useState, useEffect, useMemo } from "react";
import clsx from 'clsx';

import Icon from '@/utils/icon';

type DragItem = {
  index: number;
  id: string;
  type: string;
};
const ACCEPT_KEY = "draggable_item";
const DraggableItem: React.FC<{
  id: string;
  index: number;
  prefix: string;
  className?: string;
  dragIcon?: string;
  children: React.ReactNode;
  moveItem?: (dragIndex: number, hoverIndex: number, id: string) => void;
}> = ({ id, index, prefix, moveItem, children, className, dragIcon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const acceptKey = `${prefix}_${ACCEPT_KEY}`;
  const [prevIndex, setPrevIndex] = useState(index);

  useEffect(() => {
    setPrevIndex(index);
  }, [index]);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: acceptKey,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem?.(dragIndex, hoverIndex, id);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: acceptKey,
    item: () => {
      return { id, index };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => {
      if (moveItem) {
        return true;
      }
      return false;
    },
  });

  const transformStyle: React.CSSProperties = useMemo(() => {
    if (isDragging || prevIndex === index) {
      return {}
    }
    let transform;
    if (prevIndex > index) {
      transform = 'translateY(100%)'
    } else {
      transform = 'translateY(-100%)'
    }
    return { transform, pointerEvents: 'none' }
  }, [isDragging, prevIndex, index])

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const dragIconElement = useMemo(() => {
    if (dragIcon) {
      return <Icon className="mr-2 text-xl cursor-pointer h-10 w-10 rounded-full hover:bg-gray-200" icon={dragIcon} />;
    }
    return null;
  }, [dragIcon]);

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={clsx('flex items-center [&>:nth-child(2)]:flex-1', className)}
      style={{
        opacity,
        transition: 'transform 0.3s ease',
        ...transformStyle,
      }}
    >
      {dragIconElement}
      {children}
    </div>
  );
};

export default DraggableItem;
