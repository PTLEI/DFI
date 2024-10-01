import { useMemo } from "react";

import ContentDashed from "@/components/layout/content_dashed";
import { BADGES, SECTION_KEY } from "@/constant/general";
import { useBlocksData } from "@/context";
import { BadgeItem } from "../blocks_setting/badges_settings";
import { Badge } from "@/types/data";

const BadgesInfo = () => {
  const { blocks } = useBlocksData();

  const badges: Badge[] = useMemo(() => {
    const ids = blocks.badges || [];
    const result: Badge[] = [];
    ids.forEach((id) => {
      const item = BADGES.find((badge) => badge.name === id);
      if (item) {
        result.push(item);
      }
    });
    return result;
  }, [blocks.badges]);

  if (badges.length === 0) {
    return null;
  }

  return (
    <ContentDashed id={SECTION_KEY.BADGES} className="flex flex-wrap gap-2">
      {badges.map((badge) => {
        return <BadgeItem key={badge.name} badge={badge} />;
      })}
    </ContentDashed>
  );
};

export default BadgesInfo;
