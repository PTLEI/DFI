import { useBlocksData } from "@/context";
import { SECTION_KEY } from "@/constant/general";
import ContentDashed from '../layout/content_dashed';

const AboutInfo = () => {
  const { blocks } = useBlocksData();

  if (!blocks.about_me) {
    return null;
  }

  return (
    <ContentDashed id={SECTION_KEY.ABOUT_ME}>
      {blocks.about_me && (
        <div dangerouslySetInnerHTML={{ __html: blocks.about_me || "" }} />
      )}
    </ContentDashed>
  );
};

export default AboutInfo;
