import { Tabs, Tab } from 'react-bootstrap';
import { useContext } from 'react';
import GlobalContext from '@/context';

import TabLayout from './tab_layout';
import TabColor from './tab_color';
import TabType from './tab_type';
import TabBlocks from './tab_blocks';

const Nav = () => {
  const {} = useContext(GlobalContext);

  return (
    <div className="flex-none w-1/3">
      <Tabs
        variant='underline'
        fill
      >
        <Tab
          title='Layout'
        >
          <TabLayout/>
        </Tab>
        <Tab
          title='Color'
        >
          <TabColor/>
        </Tab>
        <Tab
          title='Type'
        >
          <TabType/>
        </Tab>
        <Tab
          title='Blocks'
        >
          <TabBlocks/>
        </Tab>
      </Tabs>
    </div>
  );
};
export default Nav;
