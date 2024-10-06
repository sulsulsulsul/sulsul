import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { ArchiveStatus } from '@/entities/types';
import { cn } from '@/lib/utils';

import { ActionButtons } from './action-buttons';

interface ArchiveContentProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  resume: string;
  companyName: string;
  status: ArchiveStatus;
}

export const ArchiveContent = ({
  className,
  title,
  resume,
  companyName,
  status,
  ...props
}: ArchiveContentProps) => {
  return (
    <div className={cn('h-full', className)} {...props}>
      <h2
        className={cn('flex items-center gap-1 text-4xl font-bold', className)}
      >
        <Image
          src="/images/icons/etc-pencil.svg"
          width={32}
          height={32}
          alt="icon"
        />
        <span>내 자기소개서</span>
      </h2>
      <div className="mt-[18px] flex size-full h-[650px] flex-col gap-2 rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
        <div className="flex size-full flex-col gap-3">
          <div className="w-fit cursor-default rounded-sm bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600">
            {companyName}
          </div>
          <div>
            <h3 className="w-full cursor-default text-2xl font-semibold">
              {title}
            </h3>
          </div>
          <div className="w-full">
            <div className="max-h-[400px] cursor-default overflow-scroll whitespace-pre-line">
              {resume}
            </div>
          </div>
        </div>
        <div className="text-sm font-semibold">
          <span className="text-gray-600">{resume.length}</span>
          <span className="text-gray-400">/2000자</span>
        </div>
        <ActionButtons status={status} />
      </div>
    </div>
  );
};
