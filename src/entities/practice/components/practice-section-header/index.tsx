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
    <div className={cn('flex gap-0.5 items-center', className)} {...props}>
      <Image className="" src={iconSrc} width={32} height={32} alt="" />
      <h2 className="text-4xl font-bold text-gray-900 mobile:text-2xl">
        {title}
      </h2>
    </div>
  );
};

export default PracticeSectionHeader;
