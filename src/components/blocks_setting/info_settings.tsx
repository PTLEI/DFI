import { Fragment, ChangeEvent } from 'react'
import { Image, Form } from 'react-bootstrap'
import { useBlocksData } from '@/context/index'

const InfoSettings: React.FC = () => {
  const { blocks, updateBlocks } = useBlocksData();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (updateBlocks) {
      updateBlocks({
        ...blocks,
        [id]: value
      });
    }
  };

  return (
    <Fragment>
      <div className="m-3">
        <span>头像</span>
        <Image className='w-24 h-24' roundedCircle src='/favicon.ico' alt='头像'/>
        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="first_name">
            <Form.Label>名字</Form.Label>
            <Form.Control type="text" placeholder="输入名字" value={blocks.first_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="last_name">
            <Form.Label>姓氏</Form.Label>
            <Form.Control type="text" placeholder="输入姓氏" value={blocks.last_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>位置</Form.Label>
            <Form.Control type="text" placeholder="输入位置" value={blocks.location} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="pronouns">
            <Form.Label>代词</Form.Label>
            <Form.Control type="text" placeholder="输入代词" value={blocks.pronouns} onChange={handleChange} />
          </Form.Group>
        </Form>
      </div>
    </Fragment>
  )
}

export default InfoSettings
