import React, { HTMLAttributes, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

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
  const [sortType, setSortType] = useState<'asc' | 'desc'>('desc');
  const { archives, isError, isLoading, isSuccess } = useArchives(
    currentPage - 1,
    sortType,
  );
  const router = useRouter();
  const { status } = useSession();

  const onChangeSortType = (value: 'asc' | 'desc') => {
    setSortType(value);
  };

  if (status === 'unauthenticated' || archives?.totalCount === 0) {
    return (
      <main>
        <div className="flex justify-between px-4">
          <div className="flex items-center gap-1 text-4xl font-bold">
            <Image
              width={32}
              height={32}
              src={'/images/icons/etc-folder.svg'}
              alt="etc folder"
            />
            <h2>내 면접질문 및 답변</h2>
          </div>
          <SelectDropdown onChangeSortType={onChangeSortType} />
        </div>
        <div className="mt-40 mobile:hidden">
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
        <div className="flex w-full flex-col items-center">
          <div
            className={
              'relative mx-4 mt-4 hidden h-[380px] w-[260px] px-5 text-white mobile:flex mobile:h-[253px] mobile:w-[343px]'
            }
          >
            <div className="absolute left-0 top-[20px] z-0 h-[90%] w-full rounded-md bg-blue-900 mobile:top-[10px] mobile:h-[243px]">
              <span className="absolute right-6 top-[8px] text-2xs font-semibold text-white/70">
                {'작성 전'}
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
                  <h3 className="text-2xs font-semibold">{'술술 컴퍼니'}</h3>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    className="cursor-pointer"
                    width={24}
                    height={24}
                    color="white"
                    src={'/images/icons/icn-more.svg'}
                    alt="more icon"
                  />
                </div>
              </div>
              <div className="mt-3 h-[84px]">
                <h4 className="text-xl font-semibold text-blue-300">
                  {'아직 내 면접질문과 답변이 없어요'}
                </h4>
                <h4 className="text-xl font-semibold text-white">
                  {'PC버전에서 면접질문을 예측해보세요!'}
                </h4>
              </div>
              <div className="mobile:[16px] mt-[20px] text-lg font-normal">
                예상 면접질문{' '}
                <span className="text-green-point">{' ? 개'}</span>
              </div>

              <div className="flex h-full grow flex-col justify-end ">
                <div className="relative">
                  <div className="h-[6px] rounded-[6.6px] bg-white/30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!isSuccess) {
    return null;
  }

  return (
    <main className="relative px-[16px] pt-[-60px] sm:px-[-12px] md:px-[-20px]">
      <div className="mx-5 flex justify-between mobile:mx-0">
        <div className="flex items-center gap-1 text-4xl font-bold mobile:text-2xl mobile:font-semibold mobile:leading-8">
          <Image
            width={32}
            height={32}
            src={'/images/icons/etc-folder.svg'}
            alt="etc folder"
          />
          <h2 className="">내 면접질문 및 답변 </h2>
          <span className="text-blue-500">{archives?.totalCount}</span>
        </div>
        <SelectDropdown onChangeSortType={onChangeSortType} />
      </div>
      <div className="my-4 mb-14 flex items-center justify-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 2xl:grid-cols-4">
          {archives &&
            archives.archives?.map((archive: ArchiveListItemDTO) => (
              <>
                <Link
                  key={archive.archiveId}
                  href={APP_ROUTES.archiveDetail(archive.archiveId)}
                  className="hidden desktop:block"
                >
                  <ArchiveCard
                    key={archive.archiveId}
                    currentPage={currentPage}
                    {...archive}
                  />
                </Link>
                <ArchiveCard
                  key={'mobile' + archive.archiveId}
                  currentPage={currentPage}
                  {...archive}
                  className="hidden mobile:block"
                />
              </>
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
