import { Button } from 'react-bootstrap'
import {useCallback} from 'react';

import { useGlobalContext } from '@/context'
import InfoSettings from './info_settings'

const BlocksSettings = () => {
  const {setEditingKey} = useGlobalContext();

  const handleBack = useCallback(() => {
    setEditingKey?.();
  }, [setEditingKey]);

  return (
    <div className='absolute z-50 h-full w-full bg-white overflow-hidden flex flex-col'>
      <div className='basic-16 flex justify-between items-center p-3 border-b border-gray-300'>
        <span onClick={handleBack}>Back</span>
        <div>Title</div>
        <Button>Save</Button>
      </div>
      <div className='flex-1 overflow-auto'>
        <InfoSettings/>
      </div>
    </div>
  )
}

export default BlocksSettings
