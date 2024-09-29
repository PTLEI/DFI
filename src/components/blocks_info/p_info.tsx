import { Image } from "react-bootstrap";
import { useBlocksData } from "@/context";

const PersonInfo = () => {
  const { blocks } = useBlocksData();

  return (
    <div id="blocks-p" className="p-4">
      {blocks.avatar && (
        <Image
          className="mb-3 h-40 w-40"
          roundedCircle
          src={blocks.avatar}
          alt="avatar"
        />
      )}
      {blocks.first_name && <p>First Name: {blocks.first_name}</p>}
      {blocks.last_name && <p>Last Name: {blocks.last_name}</p>}
      {blocks.pronouns && <p>Pronouns: {blocks.pronouns}</p>}
      {blocks.location && <p>Location: {blocks.location}</p>}
    </div>
  );
};

export default PersonInfo;
