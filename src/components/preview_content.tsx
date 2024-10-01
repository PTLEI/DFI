import { Button } from "react-bootstrap";
import PersonInfo from "./blocks_info/p_info";
import AboutInfo from "./blocks_info/about_info";
import BadgesInfo from "./blocks_info/badges_info";
import SocialInfo from "./blocks_info/social_info";

const PreviewContent = () => {
  return (
    <div className="flex-1 px-8 flex flex-col bg-lime-100">
      <div className="flex flex-none justify-end mt-4">
        <Button>Preview</Button>
        <Button className=" ml-4">Save Change</Button>
      </div>
      <div className="flex-1 overflow-auto mt-4 bg-white rounded-3xl px-1 pt-16 pb-2">
        <div className="max-w-3xl m-auto">
          {/* header */}
          <div className="px-4 py-4 [&>:not(:first-child)]:mt-3">
            <PersonInfo />
            <BadgesInfo />
            <AboutInfo />
            <SocialInfo />
          </div>
          {/* body */}
          <div className="px-3 py-4"></div>
        </div>
      </div>

      {/* 很奇怪的一个问题，icon 的 inline-flex 没有被打包进入bundle -> 在上层组件显示定义就可以 */}
      <div className="inline-flex justify-center items-center" />
    </div>
  );
};

export default PreviewContent;
