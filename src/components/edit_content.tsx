import { Button } from "react-bootstrap";
import PersonInfo from './blocks_info/p_info';

const EditContent = () => {
  return (
    <div className="flex-1 py-4 px-8 bg-lime-100">
      <div className='flex justify-end'>
        <Button>Preview</Button>
        <Button className=' ml-4'>Save Change</Button>
      </div>
      <div className='mt-4'>
        <PersonInfo/>
      </div>
    </div>
  );
};

export default EditContent;
