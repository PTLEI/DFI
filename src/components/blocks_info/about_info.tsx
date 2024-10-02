import { useMemo } from "react";

import { useBlocksData, useGlobalContext } from "@/context";
import { SECTION_KEY } from "@/constant/general";
import ContentDashed from '../layout/content_dashed';

const mockAboutMe = 'I am a PPPP individual living in Location with a passion for sharing my knowledge and experiences through podcast appearances. With a background in product design, I am constantly seeking new ways to make a meaningful impact in the world.';

const AboutInfo = () => {
  const { locationKey } = useGlobalContext();
  const { blocks } = useBlocksData();

  const { aboutMe, mockAnimation } = useMemo(() => {
    if (blocks.about_me) {
      return { aboutMe: blocks.about_me };
    } else if (locationKey === SECTION_KEY.ABOUT_ME) {
      return { aboutMe: mockAboutMe, mockAnimation: true };
    }
    return { aboutMe: "" };
  }, [blocks.about_me, locationKey]);

  if (!aboutMe) {
    return null;
  }

  return (
    <ContentDashed id={SECTION_KEY.ABOUT_ME} mockAnimation={mockAnimation}>
      {aboutMe && (
        <div dangerouslySetInnerHTML={{ __html: aboutMe || "" }} />
      )}
    </ContentDashed>
  );
};

export default AboutInfo;
