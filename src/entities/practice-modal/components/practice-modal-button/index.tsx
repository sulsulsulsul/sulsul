import { Dispatch, HTMLAttributes, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ButtonSectionProp extends HTMLAttributes<HTMLDivElement> {
  setCancel: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
  setDisable: boolean;
  listCount: number;
}

export default function PracticeModalButton({
  setCancel,
  handleSubmit,
  setDisable,
  className,
  listCount,
}: ButtonSectionProp) {
  return (
    <section
      className={cn(
        'mb-[20px] pr-[36px] mt-[16px] flex flex-row gap-2 w-full justify-end',
        className,
      )}
    >
      <Button
        size="default"
        variant="ghost"
        className="w-[117px] border border-gray-400 text-gray-400"
        onClick={() => setCancel(false)}
      >
        취소
      </Button>
      <Button
        onClick={handleSubmit}
        disabled={setDisable}
        className="flex w-[180px] gap-1"
      >
        {listCount === 0 ? (
          <span>?</span>
        ) : (
          <span className="text-green-point">{listCount}</span>
        )}
        문항연습 시작
      </Button>
    </section>
  );
}
