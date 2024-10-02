import { Fragment, ChangeEvent } from "react";
import { Image, Form } from "react-bootstrap";
import { useBlocksData } from "@/context/index";

const InfoSettings: React.FC = () => {
  const { blocks, updateBlocks } = useBlocksData();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (updateBlocks) {
      updateBlocks({
        ...blocks,
        [id]: value
      });
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && updateBlocks) {
          updateBlocks({
            ...blocks,
            avatar: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Fragment>
      <Form className="m-3">
        <Form.Group className="mb-3" controlId="avatar">
          <Form.Label>Avatar</Form.Label>
          <div className="flex items-center">
            <Image
              className="w-24 h-24 mr-4 flex-none object-cover"
              roundedCircle
              src={blocks.avatar || "/p.jpeg"}
              alt="Avatar"
            />
            <label htmlFor="avatarUpload" className="btn btn-primary">
              Upload
            </label>
            <Form.Control
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={blocks.first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={blocks.last_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={blocks.location}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pronouns">
          <Form.Label>Pronouns</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter pronouns"
            value={blocks.pronouns}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default InfoSettings;
