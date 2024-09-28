import { Fragment } from 'react';
import { useGlobalContext } from '@/context';

export default function TabBlocks() {
  const { setEditingKey } = useGlobalContext();

  return (
    <Fragment>
      <section>
        <h2>Site Information</h2>
        <ul className='list-none'>
          <li className='flex border-b border-gray-400'>
            <div onClick={() => {
              setEditingKey?.('personal_info');
            }}>Personal Info</div>
          </li>
          <li className='flex border-b border-gray-400'>
            <div>My Site Settings</div>
          </li>
        </ul>
      </section>
      <section><h2>Header Section</h2></section>
      <section><h2>Body Section</h2></section>
      <section><h2>Block Library</h2></section>
    </Fragment>
  )
}
