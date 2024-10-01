import { Button } from "react-bootstrap";
import { useMemo } from 'react';

import { useGlobalContext } from '@/context';

import PersonInfo from "./blocks_info/p_info";
import AboutInfo from "./blocks_info/about_info";
import BadgesInfo from "./blocks_info/badges_info";
import SocialInfo from "./blocks_info/social_info";
import { COLORS, FONTS } from '@/constant/general';

const PreviewContent = () => {
  const { data } = useGlobalContext();

  const activeColor = useMemo(() => {
    return COLORS.find(color => color.name === data.color)?.value || COLORS[0].value;
  }, [data.color]);

  const activeFont = useMemo(() => {
    return FONTS.find(font => font.name === data.type)?.value;
  }, [data.type]);

  return (
    <div className="flex-1 px-8 flex flex-col bg-lime-100">
      <div className="flex flex-none justify-end mt-4">
        <Button>Preview</Button>
        <Button className=" ml-4">Save Change</Button>
      </div>
      <div
        className="flex-1 overflow-auto mt-4 rounded-3xl px-1 pt-16 pb-2"

        // 颜色统一做成css变量 var() 更佳 -> 上层定义，下层引用
        style={{ fontFamily: activeFont, backgroundColor: activeColor[0], color: activeColor[1] }}
      >
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
