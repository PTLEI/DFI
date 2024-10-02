import clsx from "clsx";
import React, { Fragment, useCallback, useMemo } from "react";

import { useGlobalContext } from "@/context";
import { LAYOUTS } from "@/constant/general";

import { SectionHeader } from "./tab_blocks";

const PreviewLayout: React.FC<{
  layoutId: string;
  layoutName: string;
  handleSelect: (layout: string) => void;
  selected: boolean;
}> = ({ layoutId, layoutName, handleSelect, selected }) => {
  const handleClick = useCallback(() => {
    handleSelect(layoutId);
  }, [handleSelect, layoutId]);

  return (
    <div
      onClick={handleClick}
      className={clsx("border-4 mb-4 rounded cursor-pointer", {
        "border-blue-500": selected,
      })}
    >
      <div className="h-40 w-full bg-gray-300"/>
      <div className='flex items-center justify-between h-11 p-2'>
        <span className='mr-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis'>{layoutName}</span>
        {selected && <span className='text-xs border-blue-500 px-2 py-1 rounded-lg bg-blue-500 text-white'>SELECTED</span>}
      </div>
    </div>
  );
};

export default function TabLayout() {
  const { data, setData } = useGlobalContext();

  const activeLayout = useMemo(() => {
    return data.layout;
  }, [data.layout]);

  const handleLayoutChange = useCallback(
    (layout: string) => {
      setData?.({ ...data, layout: layout });
    },
    [data, setData]
  );

  return (
    <Fragment>
      <SectionHeader title="Choose your Layout" />
      <ul className="mx-3 mb-6">
        {LAYOUTS.map((layout) => (
          <PreviewLayout
            key={layout.id}
            layoutId={layout.id}
            layoutName={layout.name}
            handleSelect={handleLayoutChange}
            selected={layout.id === activeLayout}
          />
        ))}
      </ul>
    </Fragment>
  );
}
