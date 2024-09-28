import { useBlocksData } from '@/context'

const PersonInfo = () => {
  const { blocks } = useBlocksData();

  return (
    <div id='blocks-p' className="p-4">
      {blocks.first_name && <p>名字: {blocks.first_name}</p>}
      {blocks.last_name && <p>姓氏: {blocks.last_name}</p>}
      {blocks.pronouns && <p>代词: {blocks.pronouns}</p>}
      {blocks.location && <p>位置: {blocks.location}</p>}
    </div>
  )
}

export default PersonInfo
