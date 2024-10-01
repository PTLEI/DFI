import { Button } from 'react-bootstrap'
import { ComponentType, useCallback, useMemo } from 'react';

import Icon from '@/utils/icon';
import { useGlobalContext } from '@/context'
import { SECTION_KEY, SECTION_TITLE } from '@/constant/general'
import InfoSettings from './info_settings'
import BadgesSettings, { AddBadges } from './badges_settings'
import SocialSettings, { SocialDetail } from './social_settings'
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
  title: string;
  Component: ComponentType;
}

const SettingsBase: React.FC<SettingsBaseProps> = ({ handleBack, title, Component }) => {
  if (!Component) {
    return null;
  }

  return (
    <div className='absolute z-50 h-full w-full bg-white overflow-hidden flex flex-col'>
      <div className='basic-16 flex justify-between items-center p-3 border-b border-gray-300'>
        <div className='basis-8 flex items-center'><Icon icon='arrow-left' onClick={handleBack}/></div>
        <div className='text-bold text-lg'>{title}</div>
        <Button className='basis-8 invisible'>Save</Button>
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

  const showingBlock = useMemo(() => {
    if (!editingKey) {
      return null;
    }
    return BLOCK_SETTINGS[editingKey];
  }, [editingKey]);

  if (!showingBlock) {
    return null;
  }

  const { title, Component } = showingBlock;

  return (
    <SettingsBase
      handleBack={handleBack}
      title={title}
      Component={Component}
    />
  )
}

export const ExtraBlockSettings: React.FC = () => {
  const { editingExtra, setEditingExtra } = useGlobalContext();

  const handleBack = useCallback(() => {
    setEditingExtra?.();
  }, [setEditingExtra]);

  const showingBlock = useMemo(() => {
    if (!editingExtra) {
      return null;
    }

    if (editingExtra.key === SECTION_KEY.SOCIAL) {
      let sTitle = 'Social'
      if (editingExtra.state?.socialId) {
        sTitle = 'Edit ' + sTitle
      } else {
        sTitle = 'Add ' + sTitle
      }
      return {
        title: sTitle,
        Component: SocialDetail,
      }
    }

    return BLOCK_SETTINGS_EXTRA[editingExtra.key];
  }, [editingExtra]);

  if (!showingBlock) {
    return null;
  }

  const { title, Component } = showingBlock;

  return (
    <SettingsBase
      handleBack={handleBack}
      title={title}
      Component={Component}
    />
  )
}

export default SettingsBase
