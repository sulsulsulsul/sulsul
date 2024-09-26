import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

export interface NoDataCardProps extends HTMLAttributes<HTMLDivElement> {
  content?: string;
}

const NoDataCard = ({
  className,
  content = '아직 데이터가 없어요',
}: NoDataCardProps) => {
  return (
    <div
      className={cn(
        'bg-white h-full w-full rounded-md flex flex-col justify-center items-center mobile:h-80',
        className,
      )}
    >
      <Image src="/images/no-data-face.svg" width={42} height={42} alt="" />
      <span className="mt-[6px] text-gray-400">{content}</span>
    </div>
  );
};

export default NoDataCard;
