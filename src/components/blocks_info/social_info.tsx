import { useMemo } from "react";

import Icon from "@/utils/icon";
import ContentDashed from "@/components/layout/content_dashed";
import { SECTION_KEY } from "@/constant/general";
import { useBlocksData, useGlobalContext } from "@/context";
import { Social } from "@/types/data";

const mockSocials: Social[] = [
  {
    id: "1",
    name: "Facebook",
    icon: "a-62",
    link: "https://www.facebook.com",
  },
  {
    id: "2",
    name: "Instagram",
    icon: "a-64",
    link: "https://www.instagram.com",
  },
];

const SocialInfo: React.FC = () => {
  const { locationKey } = useGlobalContext();
  const { blocks } = useBlocksData();

  const { socials, mockAnimation } = useMemo(() => {
    if (blocks.socials && blocks.socials.length > 0) {
      return { socials: blocks.socials };
    } else if (locationKey === SECTION_KEY.SOCIAL) {
      return { socials: mockSocials, mockAnimation: true };
    }
    return { socials: [] };
  }, [blocks.socials, locationKey]);

  if (socials.length === 0) {
    return null;
  }

  return (
    <ContentDashed
      id={SECTION_KEY.SOCIAL}
      className="flex flex-wrap gap-2"
      mockAnimation={mockAnimation}
    >
      {socials.map((social) => {
        return <Icon key={social.id} icon={social.icon} />;
      })}
    </ContentDashed>
  );
};

export default SocialInfo;
