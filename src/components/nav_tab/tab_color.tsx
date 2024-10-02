import clsx from "clsx";
import React, { Fragment, useCallback, useMemo } from "react";

import { useGlobalContext } from "@/context";
import { COLORS } from "@/constant/general";

import { SectionHeader } from "./tab_blocks";

const PreviewColor: React.FC<{
  colorId: string;
  color: string[];
  handleSelect: (color: string) => void;
  selected: boolean;
}> = ({ colorId, color, handleSelect, selected }) => {
  const handleClick = useCallback(() => {
    handleSelect(colorId);
  }, [handleSelect, colorId]);

  return (
    <div
      onClick={handleClick}
      className={clsx("border-4 p-4 mb-4 rounded cursor-pointer", {
        "border-blue-500": selected,
      })}
    >
      <div className='flex items-center justify-between h-8 mb-6'>
        <span className='mr-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis'>{colorId}</span>
        {selected && <span className='text-xs border-blue-500 px-2 py-1 rounded-lg bg-blue-500 text-white'>SELECTED</span>}
      </div>
      <div className="flex items-stretch h-14 mb-6 rounded-lg overflow-hidden">
        {color.map((c) => (
          <div key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
};

export default function TabColor() {
  const { data, setData } = useGlobalContext();

  const activeColor = useMemo(() => {
    return data.color;
  }, [data.color]);

  const handleColorChange = useCallback(
    (colorId: string) => {
      setData?.({ ...data, color: colorId });
    },
    [data, setData]
  );

  return (
    <Fragment>
      <SectionHeader title="Choose Your Color" />
      <ul className="mx-3 mb-6">
        {COLORS.map((color) => (
          <PreviewColor
            key={color.name}
            colorId={color.name}
            color={color.value}
            handleSelect={handleColorChange}
            selected={color.name === activeColor}
          />
        ))}
      </ul>
    </Fragment>
  );
}
