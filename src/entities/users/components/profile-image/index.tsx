import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';

interface ProfileImageProps extends HTMLAttributes<HTMLDivElement> {}

export const ProfileImage = ({ className, ...props }: ProfileImageProps) => {
  const { data, image } = useUserStore();

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative size-[180px] overflow-hidden rounded-full border">
          <Image alt="프로필 이미지" fill src={image ?? ''} />
        </div>
        <div className="flex text-5xl font-bold">
          <span className="text-blue-500">{data?.nickname}</span>
          <p>님, 파이팅이에요!</p>
        </div>
      </div>
    </div>
  );
};
