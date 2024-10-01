import { useCallback, useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";

import DraggableItem from "@/components/draggable_item";

import { useGlobalContext, useBlocksData } from "@/context";
import { SECTION_KEY } from "@/constant/general";
import Icon from "@/utils/icon";
import { Social } from "@/types/data";
import { generateUniqueId } from "@/utils/general";

export const SocialDetail = () => {
  const { editingExtra, setEditingExtra } = useGlobalContext();
  const { socialId } = editingExtra?.state || {};
  const { blocks, updateBlocks } = useBlocksData();
  const [newSocial, setNewSocial] = useState<Omit<Social, 'id'>>({
    name: "",
    icon: "a-62",
    link: "",
  });

  const editingSocial: Partial<Social> = useMemo(() => {
    const social = blocks.socials?.find((social) => social.id === socialId);
    if (social) {
      return social;
    }
    return newSocial;
  }, [blocks.socials, socialId, newSocial]);

  const handleChangeSocial = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let fieldKey;
    switch (id) {
      case "socialName":
        fieldKey = "name";
        break;
      case "socialLink":
        fieldKey = "link";
        break;

      default:
        return;
    }

    if (editingSocial.id) {
      updateBlocks({
        socials: (blocks.socials || []).map((social) =>
          social.id === socialId ? { ...social, [fieldKey]: value } : social
        ),
      });
    } else {
      setNewSocial({
        ...newSocial,
        [fieldKey]: value,
      });
    }
  };

  const handleAddSocial = () => {
    updateBlocks({
      socials: (blocks.socials || []).concat({id: generateUniqueId(), ...newSocial}),
    });
    setEditingExtra?.();
  };

  const handleDeleteSocial = () => {
    updateBlocks({
      socials: (blocks.socials || []).filter((social) => social.id !== socialId),
    });
    setEditingExtra?.();
  };

  return (
    <div className="p-3">
      <Form.Group className="mb-3" controlId="socialName">
        <Form.Label>Social Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter social name"
          value={editingSocial.name}
          onChange={handleChangeSocial}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="socialLink">
        <Form.Label>Social Link</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter social link"
          value={editingSocial.link}
          rows={3}
          onChange={handleChangeSocial}
        />
      </Form.Group>
      {editingSocial.id ? (
        <Button className='w-full' variant="danger" onClick={handleDeleteSocial}>
          Delete
        </Button>
      ) : (
        <Button className='w-full' variant="primary" onClick={handleAddSocial}>
          Save
        </Button>
      )}
    </div>
  );
};

const SocialItem: React.FC<{ socialData: Social }> = ({ socialData }) => {
  const { setEditingExtra } = useGlobalContext();

  const handleEditSocial = useCallback(() => {
    setEditingExtra?.({
      key: SECTION_KEY.SOCIAL,
      state: { socialId: socialData.id },
    });
  }, [setEditingExtra, socialData]);

  if (!socialData) return null;

  return (
    <div className="flex items-center">
      <Icon
        className="w-10 h-10 mx-2 rounded-lg text-xl"
        icon={socialData.icon}
      />
      <div className="flex-1 flex flex-col">
        <span className="font-bold">{socialData.name}</span>
        <span className="text-gray-500">{socialData.link}</span>
      </div>
      <Button className="ml-2" variant="secondary" onClick={handleEditSocial}>
        Edit
      </Button>
    </div>
  );
};

const SocialSettings: React.FC = () => {
  const { setEditingExtra } = useGlobalContext();
  const { blocks, updateBlocks } = useBlocksData();

  const socialsData = useMemo(() => {
    return blocks.socials || [];
  }, [blocks.socials]);

  const handleAddSocial = () => {
    setEditingExtra?.({ key: SECTION_KEY.SOCIAL });
  };

  const moveSocial = (dragIndex: number, hoverIndex: number) => {
    const socials = blocks.socials || [];
    const social = socials[dragIndex];
    socials.splice(dragIndex, 1);
    socials.splice(hoverIndex, 0, social);
    updateBlocks({ socials });
  };

  return (
    <div className="flex flex-col">
      <Button
        className="mt-4 mb-2 mx-3"
        variant="outline-secondary"
        onClick={handleAddSocial}
      >
        Add manually
      </Button>
      {socialsData.map((social, index) => (
        <DraggableItem
          key={social.id}
          id={social.id}
          index={index}
          prefix={SECTION_KEY.SOCIAL}
          moveItem={moveSocial}
          dragIcon="a-57"
          className="h-20 p-3 border-b border-gray-200 bg-white"
        >
          <SocialItem socialData={social} />
        </DraggableItem>
      ))}
    </div>
  );
};

export default SocialSettings;
