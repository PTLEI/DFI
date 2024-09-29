import { useBlocksData } from "@/context";

const AboutInfo = () => {
  const { blocks } = useBlocksData();

  return (
    <div id="blocks-about" className="p-4">
      {blocks.about_me && (
        <div dangerouslySetInnerHTML={{ __html: blocks.about_me || "" }} />
      )}
    </div>
  );
};

export default AboutInfo;
