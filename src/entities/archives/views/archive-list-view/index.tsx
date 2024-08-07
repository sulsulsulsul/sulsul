import React, { HTMLAttributes, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PaginationDemo } from '@/app/(routes)/archive/(list)/components/pagination';
import SelectDropdown from '@/app/(routes)/archive/(list)/components/select-dropdown';
import { IdleStatus } from '@/app/(routes)/archive/create/components/form-status/status/idle';
import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { APP_ROUTES } from '@/config/constants/app-routes';
import { ArchiveListItemDTO } from '@/entities/types';

import arrowUpRight from '../../../../../public/images/icons/icon-arrow_up_right.svg';
import { ArchiveCard } from '../../components/archive-card';
import { useArchives } from '../../hooks';

interface ArchiveListViewProps extends HTMLAttributes<HTMLDivElement> {}

export const ArchiveListView = ({ className }: ArchiveListViewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { archives, isError, isLoading, isSuccess } = useArchives(
    currentPage - 1,
  );
  const [sortType, setSortType] = useState<'recent' | 'old'>('recent');

  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!isSuccess) {
    return null;
  }

  const onChangeSortType = (value: 'recent' | 'old') => {
    setSortType(value);
  };

  if (archives?.totalCount === 0) {
    return (
      <main>
        <div className="flex justify-between">
          <div className="flex items-center gap-1 text-4xl font-bold">
            <Image
              width={32}
              height={32}
              src={'/images/icons/etc-folder.svg'}
              alt="etc folder"
            />
            <h2>내 면접 질문 및 답변</h2>
          </div>
          <SelectDropdown onChangeSortType={onChangeSortType} />
        </div>
        <div className="mt-40">
          <IdleStatus
            firstLine="내 자소서를 입력하고"
            secondLine="면접 예상질문을 생성해보세요!"
          />
          <div
            className="mt-20 flex w-full items-center justify-center"
            onClick={() => router.push('/archive/create')}
          >
            <Button size="sm" className="px-8 py-4 text-[16px]">
              면접 예상질문 생성하러 가기
              <Image src={arrowUpRight} alt="대각선화살표" />
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative px-0 pt-[-60px] sm:px-[-12px] md:px-[-20px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-1 text-4xl font-bold">
          <Image
            width={32}
            height={32}
            src={'/images/icons/etc-folder.svg'}
            alt="etc folder"
          />
          <h2>내 면접 질문 및 답변 </h2>
          <span className="text-blue-500">{archives?.totalCount}</span>
        </div>
        <SelectDropdown onChangeSortType={onChangeSortType} />
      </div>
      <div className="my-4 mb-14">
        <div className="flex flex-wrap items-center gap-6">
          {archives?.archives?.map((archive: ArchiveListItemDTO) => (
            <Link
              key={archive.archiveId}
              href={APP_ROUTES.archiveDetail(archive.archiveId)}
            >
              <ArchiveCard
                key={archive.archiveId}
                currentPage={currentPage}
                {...archive}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="fixed -inset-x-6 bottom-0 z-10 w-[full+24px] bg-gray-100 py-3">
        {archives && (
          <PaginationDemo
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={archives.totalPages}
          />
        )}
      </div>
    </main>
  );
};
