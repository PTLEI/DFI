import { Fragment, useCallback } from "react";

import { useGlobalContext } from "@/context";
import Icon from "@/utils/icon";
import { SECTION_KEY, SECTION_TITLE } from '@/constant/general';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return <h2 className="text-lg font-bold px-4 py-1">{title}</h2>;
};

const BlockItem: React.FC<{
  uniqueKey: string;
  title: string;
  icon?: string;
  onClick?: () => void;
}> = ({ uniqueKey, title, icon, onClick }) => {
  const { locationKey, setLocationKey, setEditingKey } = useGlobalContext();

  const onMouseEnter = useCallback(() => {
    setLocationKey?.(uniqueKey);
  }, [uniqueKey, setLocationKey]);

  const onMouseLeave = useCallback(() => {
    if (locationKey === uniqueKey) {
      setLocationKey?.();
    }
  }, [locationKey, uniqueKey, setLocationKey]);

  const onMouseClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      setEditingKey?.(uniqueKey);
    }
  }, [uniqueKey, onClick, setEditingKey]);

  return (
    <li
      className="flex py-7 px-4 items-center border-b border-gray-100 cursor-pointer hover:bg-gray-100 group"
      onClick={onMouseClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex-1 flex items-center">
        <Icon
          className="w-10 h-10 mr-3 rounded-lg bg-gray-200 group-hover:bg-gray-400"
          icon={icon}
        />
        <span className="font-bold">{title}</span>
      </div>
      <Icon icon="right-arrow" />
    </li>
  );
};

export default function TabBlocks() {
  return (
    <Fragment>
      <section>
        <SectionHeader title="Site Information" />
        <ul className="list-none">
          <BlockItem
            uniqueKey={SECTION_KEY.P_INFO}
            title={SECTION_TITLE[SECTION_KEY.P_INFO]}
            icon='a-47'
          />
        </ul>
      </section>
      <section>
        <SectionHeader title="Header Section"/>
        <ul className="list-none">
          <BlockItem
            uniqueKey={SECTION_KEY.BADGES}
            title={SECTION_TITLE[SECTION_KEY.BADGES]}
            icon='a-72'
          />
          <BlockItem
            uniqueKey={SECTION_KEY.ABOUT_ME}
            title={SECTION_TITLE[SECTION_KEY.ABOUT_ME]}
            icon='a-100'
          />
          <BlockItem
            uniqueKey={SECTION_KEY.SOCIAL}
            title={SECTION_TITLE[SECTION_KEY.SOCIAL]}
            icon='a-39'
          />
          <BlockItem
            uniqueKey={SECTION_KEY.CONTACT_ME}
            title={SECTION_TITLE[SECTION_KEY.CONTACT_ME]}
            icon='a-77'
          />
        </ul>
      </section>
      <section>
        <SectionHeader title="Body Section" />
      </section>
      <section>
        <SectionHeader title="Block Library" />
      </section>
    </Fragment>
  );
}
