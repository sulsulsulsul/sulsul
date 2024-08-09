import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';

interface SelectAllProps {
  allitems: CheckedState;
  setAllitems: Dispatch<SetStateAction<CheckedState>>;
  reset: () => void;
  description: string;
  sectionId: string;
}

export default function PracticeModalSelectAll({
  allitems,
  setAllitems,
  reset,
  description,
  sectionId,
}: SelectAllProps) {
  return (
    <div className="flex h-[68px] w-1/2 items-center border border-gray-100 pl-[24px] text-base">
      <label htmlFor={sectionId}>
        <Checkbox
          id={sectionId}
          className="m-[10px] size-5 p-[2px] "
          checked={allitems}
          onCheckedChange={(check: CheckedState) => {
            setAllitems(check);
            !check && reset();
          }}
        />
        {description}
      </label>
    </div>
  );
}
