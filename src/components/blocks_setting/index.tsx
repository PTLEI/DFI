import { Button } from 'react-bootstrap'
import { ComponentType, useCallback, useMemo } from 'react';

import Icon from '@/utils/icon';
import { useGlobalContext } from '@/context'
import { SECTION_KEY, SECTION_TITLE } from '@/constant/general'
import InfoSettings from './info_settings'
import BadgesSettings, { AddBadges } from './badges_settings'
import SocialSettings from './social_settings'
import ContactSettings from './contact_settings'

// react-quill 中有document的调用
import dynamic from 'next/dynamic';
const AboutSettings = dynamic(() => import('./about_settings'), { ssr: false });

const BLOCK_SETTINGS = {
  [SECTION_KEY.P_INFO]: {
    title: SECTION_TITLE[SECTION_KEY.P_INFO],
    Component: InfoSettings,
  },
  [SECTION_KEY.BADGES]: {
    title: SECTION_TITLE[SECTION_KEY.BADGES],
    Component: BadgesSettings,
  },
  [SECTION_KEY.ABOUT_ME]: {
    title: SECTION_TITLE[SECTION_KEY.ABOUT_ME],
    Component: AboutSettings,
  },
  [SECTION_KEY.SOCIAL]: {
    title: SECTION_TITLE[SECTION_KEY.SOCIAL],
    Component: SocialSettings,
  },
  [SECTION_KEY.CONTACT_ME]: {
    title: SECTION_TITLE[SECTION_KEY.CONTACT_ME],
    Component: ContactSettings,
  },
}

const BLOCK_SETTINGS_EXTRA = {
  [SECTION_KEY.BADGES]: {
    title: 'Add Badges',
    Component: AddBadges,
  },
}

interface SettingsBaseProps {
  handleBack: () => void;
  editingKey: string | undefined;
  blockSettings: Record<string, { title: string; Component: ComponentType }>;
}

const SettingsBase: React.FC<SettingsBaseProps> = ({ handleBack, editingKey, blockSettings }) => {
  const showingBlock = useMemo(() => {
    if (!editingKey) {
      return null;
    }
    return blockSettings[editingKey];
  }, [editingKey, blockSettings]);

  if (!showingBlock) {
    return null;
  }

  const { title, Component } = showingBlock;

  return (
    <div className='absolute z-50 h-full w-full bg-white overflow-hidden flex flex-col'>
      <div className='basic-16 flex justify-between items-center p-3 border-b border-gray-300'>
        <Icon icon='arrow-left' onClick={handleBack}/>
        <div>{title}</div>
        <Button className='invisible'>Save</Button>
      </div>
      <div className='flex-1 overflow-auto'>
        <Component />
      </div>
    </div>
  )
}

export const BlocksSettings: React.FC = () => {
  const { editingKey, setEditingKey } = useGlobalContext();

  const handleBack = useCallback(() => {
    setEditingKey?.();
  }, [setEditingKey]);

  return (
    <SettingsBase
      handleBack={handleBack}
      editingKey={editingKey}
      blockSettings={BLOCK_SETTINGS}
    />
  )
}

export const ExtraBlockSettings: React.FC = () => {
  const { editingExtra, setEditingExtra } = useGlobalContext();

  const handleBack = useCallback(() => {
    setEditingExtra?.();
  }, [setEditingExtra]);

  return (
    <SettingsBase
      handleBack={handleBack}
      editingKey={editingExtra}
      blockSettings={BLOCK_SETTINGS_EXTRA}
    />
  )
}

export default SettingsBase
