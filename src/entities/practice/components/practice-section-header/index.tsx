import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface PracticeSectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  iconSrc: string;
  isDesktop?: boolean;
}

const PracticeSectionHeader = ({
  className,
  title,
  iconSrc,
  isDesktop,
  ...props
}: PracticeSectionHeaderProps) => {
  return (
    <div className={cn('flex gap-1.5 items-center', className)} {...props}>
      <Image
        className="translate-y-[-2px]"
        src={iconSrc}
        width={isDesktop ? 32 : 24}
        height={isDesktop ? 32 : 24}
        alt=""
      />
      <h2 className="text-4xl font-bold text-gray-800 mobile:text-2xl">
        {title}
      </h2>
    </div>
  );
};

export default PracticeSectionHeader;
