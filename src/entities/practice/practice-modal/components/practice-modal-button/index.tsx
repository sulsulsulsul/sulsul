import { HTMLAttributes } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useOpenModalStore } from '@/store/modal';

interface ButtonSectionProp extends HTMLAttributes<HTMLDivElement> {
  handleSubmit: () => void;
  setDisable: boolean;
  listCount: number;
}

export default function PracticeModalButton({
  handleSubmit,
  setDisable,
  className,
  listCount,
}: ButtonSectionProp) {
  const { setModalOpen } = useOpenModalStore();
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
        onClick={() => setModalOpen(false)}
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
