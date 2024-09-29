"use client";
import { Fragment, useState } from "react";
import { useBlocksData } from "@/context";
import ReactQuill from "react-quill";
import "@/style/quill.css";

const AboutSettings: React.FC = () => {
  const { blocks, updateBlocks } = useBlocksData();
  const [aboutMe, setAboutMe] = useState(blocks.about_me || "");

  const handleChange = (value: string) => {
    setAboutMe(value);
    updateBlocks({ about_me: value });

    // 可以使用editor.getContents()获取Delta
    // console.log(editor.getContents());
  };

  return (
    <Fragment>
      <div className="m-2 rounded-md" style={{ height: "300px" }}>
        <ReactQuill
          value={aboutMe}
          onChange={handleChange}
          placeholder="Hey Polywork 👋 I'm excited to be in the community and collaborate with you all. Check out my page and reach out!"
        />
      </div>
    </Fragment>
  );
};

export default AboutSettings;
