import { Tabs, Tab, TabPane } from "react-bootstrap";
import { Fragment, useContext, useMemo } from "react";
import GlobalContext from "@/context";
import { BLOCKS_KEY, COLOR_KEY, LAYOUT_KEY, TYPE_KEY } from "@/constant/general";

import TabLayout from "./nav_tab/tab_layout";
import TabColor from "./nav_tab/tab_color";
import TabType from "./nav_tab/tab_type";
import TabBlocks from "./nav_tab/tab_blocks";
import PaneLayout from './layout/pane_layout';
import {BlocksSettings, ExtraBlockSettings} from './blocks_setting';

const TABS_OBJ: Record<string, { content: React.FC; title: string }> = {
  [LAYOUT_KEY]: {
    content: TabLayout,
    title: "Layout",
  },
  [COLOR_KEY]: {
    content: TabColor,
    title: "Color",
  },
  [TYPE_KEY]: {
    content: TabType,
    title: "Type",
  },
  [BLOCKS_KEY]: {
    content: TabBlocks,
    title: "Blocks",
  }
};

const Nav = () => {
  const { tab, setTab, editingKey, editingExtra } = useContext(GlobalContext);

  const onTabChanged = (activeKey: string | null) => {
    if (activeKey) {
      setTab?.(activeKey);
    }
  };

  const ActiveComponent = useMemo(() => {
    if (tab) {
      const activeItem = TABS_OBJ[tab];
      if (activeItem) {
        return activeItem.content;
      }
    }
    return Fragment;
  }, [tab]);

  return (
    <div className="flex flex-col flex-none w-1/3 border-r-gray-300 border-r main-tabs relative">
      <Tabs variant="underline" fill activeKey={tab} onSelect={onTabChanged} data-bs-theme="light">
        {Object.entries(TABS_OBJ).map(([itemKey, { title }]) => {
          return <Tab key={itemKey} eventKey={itemKey} title={title} />;
        })}
        <TabPane eventKey={tab}>
          <PaneLayout>
            <ActiveComponent />
          </PaneLayout>
        </TabPane>
      </Tabs>
      {editingKey && <BlocksSettings/>}
      {editingExtra && <ExtraBlockSettings/>}
    </div>
  );
};
export default Nav;
