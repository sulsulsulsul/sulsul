'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import { ArchiveCardMenu } from './archive-card-menu';
interface ArchiveCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  answerCount: number;
  questionCount: number;
  companyName: string;
  archiveId: number;
  currentPage: number;
}

export const ArchiveCard = ({
  className,
  title,
  answerCount,
  questionCount,
  companyName,
  archiveId,
  currentPage,
}: ArchiveCardProps) => {
  const [archiveStatus, setArchiveStatus] = useState<string>('');

  useEffect(() => {
    if (answerCount === 0) return setArchiveStatus('작성 전');
    if (answerCount < questionCount) return setArchiveStatus('작성 중');
    if (answerCount === questionCount) return setArchiveStatus('작성 완료');
  }, [archiveStatus, answerCount, questionCount]);

  let percentage = !!questionCount ? (answerCount / questionCount) * 100 : 0;

  return (
    <div
      className={cn(
        'relative w-[260px] h-[380px] px-5 text-white mobile:h-[253px] mobile:w-[343px]',
        className,
      )}
      // onClick={()=>toast('PC버전으로 접속해주세요')}
      onClick={() => {
        toast('PC버전으로 접속해주세요', {
          className: 'w-[343px] h-[53px] bg-gray-800 text-white px-4 mt-12',
          position: 'top-center',
          dismissible: true,
          style: {
            background: '#2B2D35',
            color: 'white',
            border: 'none',
          },
        });
      }}
    >
      <div className="absolute left-0 top-[20px] z-0 h-[90%] w-full rounded-md bg-blue-900 mobile:top-[10px] mobile:h-[243px]">
        <span className="absolute right-6 top-[8px] text-2xs font-semibold text-white/70">
          {archiveStatus}
        </span>
      </div>
      <Image
        className="absolute left-0 top-0 z-10 h-[380px] mobile:hidden"
        width={400}
        height={600}
        src={'/images/folder-box.svg'}
        alt="card background image"
        priority
      />
      <Image
        className="absolute left-0 top-0 z-10 h-[253px] desktop:hidden"
        width={400}
        height={600}
        src={'/images/folder-box-mobile.svg'}
        alt="card background image"
        priority
      />
      <div className="relative z-10 flex h-[380px] flex-col bg-transparent pb-[50px] pt-[62px] mobile:h-[253px]">
        <div className="flex justify-between">
          <div className="rounded-sm bg-gray-100 px-[10px] py-[7px] text-blue-500">
            <h3 className="text-2xs font-semibold">{companyName}</h3>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center"
          >
            <ArchiveCardMenu archiveId={archiveId} currentPage={currentPage} />
          </div>
        </div>
        <div className="mt-3 h-[84px]">
          <h4 className="line-clamp-3 text-2xl font-semibold">{title}</h4>
        </div>
        {questionCount === 0 ? (
          <div className="mobile:[16px] mt-[20px] text-lg font-normal">
            아직 생성된 질문이 없어요
          </div>
        ) : (
          <div className="mobile:[16px] mt-[20px] text-lg font-normal">
            예상 면접질문{' '}
            <span className="text-green-point">{questionCount}</span>
          </div>
        )}
        <div className="flex h-full grow flex-col justify-end ">
          <div className="relative">
            <div
              className="absolute left-0 top-0 h-[6px] rounded-[6.6px] bg-white"
              style={{ width: `${percentage}%` }}
            ></div>
            <div className="h-[6px] rounded-[6.6px] bg-white/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
