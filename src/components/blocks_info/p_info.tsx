import { Image } from "react-bootstrap";
import { useBlocksData } from "@/context";
import { SECTION_KEY } from '@/constant/general';
import ContentDashed from '../layout/content_dashed';

const PersonInfo = () => {
  const { blocks } = useBlocksData();

  return (
    <ContentDashed id={SECTION_KEY.P_INFO}>
      <div className="flex items-center">
        {blocks.avatar && (
          <Image
          className="mb-3 h-40 w-40"
          roundedCircle
          src={blocks.avatar}
          alt="avatar"
          />
        )}
      </div>
      <div className="text-2xl font-bold">{blocks.last_name}</div>
      <div className='flex text-sm mt-2'>
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
