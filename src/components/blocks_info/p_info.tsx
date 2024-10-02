import { useMemo } from "react";
import { Image } from "react-bootstrap";

import { useBlocksData, useGlobalContext } from "@/context";
import { SECTION_KEY, LAYOUTS } from "@/constant/general";
import ContentDashed from "../layout/content_dashed";

const PersonInfo = () => {
  const { blocks } = useBlocksData();
  const { data } = useGlobalContext();

  const activeLayout = useMemo(() => {
    return data.layout;
  }, [data.layout]);

  const layout: Record<string, Record<string, string | undefined> | undefined> =
    useMemo(() => {
      return LAYOUTS.find((item) => item.id === activeLayout)?.layout || {};
    }, [activeLayout]);

  return (
    <ContentDashed id={SECTION_KEY.P_INFO} style={{ ...layout.container }}>
      <div className="flex items-center" style={{ ...layout.avatar }}>
        {blocks.avatar && (
          <Image
            className="mb-3 h-40 w-40"
            roundedCircle
            src={blocks.avatar}
            alt="avatar"
          />
        )}
      </div>
      <div className="text-2xl font-bold" style={{ ...layout.last_name }}>
        {blocks.last_name}
      </div>
      <div className="flex text-sm mt-2" style={{ ...layout.name }}>
        <span>{blocks.first_name}</span>
        <span className="mx-2">·</span>
        <span>{blocks.last_name}</span>
        <span className="mx-2">·</span>
        <span>{blocks.pronouns}</span>
        <span className="mx-2">·</span>
        <span>{blocks.location}</span>
      </div>
    </ContentDashed>
  );
};

export default PersonInfo;
