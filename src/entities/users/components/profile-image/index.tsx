import { HTMLAttributes } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { cn } from '@/lib/utils';
interface ProfileImageProps extends HTMLAttributes<HTMLDivElement> {}

export const ProfileImage = ({ className, ...props }: ProfileImageProps) => {
  const { data } = useSession();
  return (
    <div
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative size-[180px] overflow-hidden rounded-full border">
          <Image alt="" fill src={data?.user?.image ?? ''} />
        </div>
        <div className="flex text-5xl font-bold">
          <span className="text-blue-500">{data?.user.data.nickname}</span>
          <p>님, 파이팅이에요!</p>
        </div>
      </div>
    </div>
  );
};
