import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
interface HeadingProps extends HTMLAttributes<HeadingProps> {}

export const Heading = ({ className, ...props }: HeadingProps) => {
  return (
    <h2 className={cn('flex items-center gap-1 text-4xl font-bold', className)}>
      <Image
        src="/images/icons/etc-pencil.svg"
        width={32}
        height={32}
        alt="icon"
      />
      <span>내 자기 소개서</span>
    </h2>
  );
};
