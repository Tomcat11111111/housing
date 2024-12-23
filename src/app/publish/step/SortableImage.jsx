import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';

const SortableImage = ({ id, src, name }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="overflow-hidden"
    >
      <Image
        src={src}
        alt={name}
        width={300}
        height={200}
        className="object-contain w-[300px] h-[200px] rounded-[4px]"
      />
    </div>
  );
};

export default SortableImage;
