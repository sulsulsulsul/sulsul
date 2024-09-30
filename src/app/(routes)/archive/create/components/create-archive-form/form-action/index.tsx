import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/entities/users/hooks';
import { cn } from '@/lib/utils';
import { useResetAvailableStore } from '@/store/resetAvailable';

import { SelectJobTypeModal } from './select-job-type-button';

interface FormActionProps extends HTMLAttributes<HTMLDivElement> {
  onClickResetContents: () => void;
}

export const FormAction = ({
  className,
  onClickResetContents,
  ...props
}: FormActionProps) => {
  const { isResetAvailable } = useResetAvailableStore();
  const { status } = useCurrentUser();

  return (
    <div className={cn(className)} {...props}>
      <div className="flex gap-2">
        <Button
          className="basis-[117px] text-gray-600 disabled:opacity-60"
          variant="outline"
          onClick={onClickResetContents}
          disabled={!isResetAvailable || status === 'unauthenticated'}
        >
          <Image
            src="/images/icons/icon-redo.svg"
            width={24}
            height={24}
            alt="icon"
          />
          <span className="ml-1">초기화</span>
        </Button>
        <SelectJobTypeModal />
      </div>
    </div>
  );
};
