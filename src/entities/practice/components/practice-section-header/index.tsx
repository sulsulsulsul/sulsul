import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface PracticeSectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  iconSrc: string;
}

const PracticeSectionHeader = ({
  className,
  title,
  iconSrc,
  ...props
}: PracticeSectionHeaderProps) => {
  return (
    <div className={cn('flex gap-1.5 items-center', className)} {...props}>
      <Image
        className="translate-y-[-2px]"
        src={iconSrc}
        width={32}
        height={32}
        alt=""
      />
      <h2 className="text-4xl font-bold text-gray-800">{title}</h2>
    </div>
  );
};

export default PracticeSectionHeader;
