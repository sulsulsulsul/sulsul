'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const AvatarSuri = () => {
  return (
    <div className="flex flex-row items-center gap-2 font-bold">
      <Avatar>
        <AvatarImage src="/images/suri-profile.svg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>수리</div>
    </div>
  );
};
