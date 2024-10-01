import clsx from "clsx";
import React, { Fragment, useCallback, useMemo } from "react";

import { useGlobalContext } from "@/context";
import { FONTS } from "@/constant/general";

import { SectionHeader } from "./tab_blocks";

const PreviewText: React.FC<{
  fontId: string;
  font: string;
  handleSelect: (font: string) => void;
  selected: boolean;
}> = ({ fontId, font, handleSelect, selected }) => {
  const handleClick = useCallback(() => {
    handleSelect(fontId);
  }, [handleSelect, fontId]);

  return (
    <div
      onClick={handleClick}
      className={clsx("border-4 p-4 mb-4 rounded cursor-pointer", {
        "border-blue-500": selected,
      })}
    >
      <div className='flex items-center justify-between h-8 mb-6'>
        <span className='mr-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis'>{fontId}</span>
        {selected && <span className='text-xs border-blue-500 px-2 py-1 rounded-lg bg-blue-500 text-white'>SELECTED</span>}
      </div>
      <div style={{ fontFamily: font }}>
        <div className="text-2xl font-bold mb-4">Preview</div>
        <p>
          This is a preview text. The font will change based on your selection.
        </p>
      </div>
    </div>
  );
};

export default function TabType() {
  const { data, setData } = useGlobalContext();

  const activeFont = useMemo(() => {
    return data.type;
  }, [data.type]);

  const handleFontChange = useCallback(
    (font: string) => {
      setData?.({ ...data, type: font });
    },
    [data, setData]
  );

  return (
    <Fragment>
      <SectionHeader title="Choose your typography" />
      <ul className="mx-3 mb-6">
        {FONTS.map((font) => (
          <PreviewText
            key={font.name}
            fontId={font.name}
            font={font.value}
            handleSelect={handleFontChange}
            selected={font.name === activeFont}
          />
        ))}
      </ul>
    </Fragment>
  );
}
