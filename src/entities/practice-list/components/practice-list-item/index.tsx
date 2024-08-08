import Image from 'next/image';

import { Checkbox } from '@/components/ui/checkbox';

export default function PracticeListItem() {
  return (
    <div className="flex flex-row justify-around">
      <Checkbox />
      <button></button>
      <div className="flex flex-col">
        <div></div>
        <div></div>
      </div>
      <div className="">
        <span>42초</span>
        <span>2회</span>
        <span>
          {/* <Image>
        
        </Image> */}
        </span>
      </div>
    </div>
  );
}
