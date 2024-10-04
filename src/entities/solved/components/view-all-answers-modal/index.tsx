import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { SelectContent, SelectValue } from '@radix-ui/react-select';
import dayjs from 'dayjs';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { AnswerListData } from '@/entities/types/interview';
import { cn, getRecentWeeks, removeNewlines } from '@/lib/utils';
import { useAnswerModalStore } from '@/store/answerModalStore';
import { useUserStore } from '@/store/client';

import { useAnswerRecommend } from '../../hooks/use-answer-recommend';
import { useAnswerList } from '../../hooks/use-get-answer-list';
import { useInterview } from '../../hooks/use-get-interview';
import { useUserAnswer } from '../../hooks/use-get-user-answer';
import { useInterval } from '../../hooks/use-interval';
import { DEFAULT_IMAGE_URL } from '../best-comments-section';
import { MyAnswerSection } from '../my-answer-section';

interface ViewAllAnswersModalProp {
  handleClickCloseBtn: () => void;
}
export const ViewAllAnswersModal = ({
  handleClickCloseBtn,
}: ViewAllAnswersModalProp) => {
  const currentDate = dayjs();
  const [weeks, setWeeks] = useState<
    { label: string; start: string; end: string }[]
  >(getRecentWeeks(currentDate));
  const [isOpenMoreMenu, setOpenMoreMenu] = useState(false);
  const [filter, setFilter] = useState(weeks[0].label);
  const [countIndex, setCountIndex] = useState(0);
  const [filteredResponses, setFilteredResponses] = useState<AnswerListData[]>(
    [],
  );

  const [selectedDate, setSelectedDate] = useState(weeks[0].end);
  const [sortType, setSortType] = useState<'NEW' | 'RECOMMEND'>('NEW');

  const { auth } = useUserStore();
  const { setIsOpenAllAnswerModal, isOpenDeleteModal } = useAnswerModalStore();
  const { data: interviewData } = useInterview(selectedDate);

  const { userId, accessToken } = auth;

  const { data: myWriteAnswerData } = useUserAnswer({
    interviewId: interviewData?.weeklyInterviewId || 1,
    userId,
    accessToken,
  });

  const {
    data: recommendOrderAnswerData,
    fetchNextPage: fetchRecommendNextPage,
    isFetchingNextPage,
    hasNextPage: recommendHasNextPage,
  } = useAnswerList({
    interviewId: interviewData?.weeklyInterviewId || 0,
    sortType: 'RECOMMEND',
    accessToken: accessToken,
  });

  const {
    data: recentOrderAnswerData,
    hasNextPage: recentHasNextPage,
    fetchNextPage: fetchRecentNextPage,
    isLoading,
  } = useAnswerList({
    interviewId: interviewData?.weeklyInterviewId || 0,
    sortType: 'NEW',
    accessToken: accessToken,
  });

  const { mutate: recommendMutation } = useAnswerRecommend({
    currentInterviewId: interviewData?.weeklyInterviewId || 0,
    accessToken,
    userId,
    pivotDate: selectedDate,
    sortType,
  });

  const { ref: triggerRef, inView } = useInView();

  useInterval(
    () => {
      const newDate = dayjs();
      const newWeeks = getRecentWeeks(newDate);

      setWeeks(newWeeks);
    },
    1000 * 60 * 60 * 24,
  );

  const handleSelectWeek = (label: string) => {
    setFilter(label);
    const selectedWeek = weeks.find((week) => week.label === label);
    if (selectedWeek) {
      setSelectedDate(selectedWeek.end);
    }
  };

  const handleClickMoreMenu = (
    e: React.MouseEvent<HTMLImageElement>,
    i: number,
  ) => {
    setCountIndex(i);
    setOpenMoreMenu((prev) => !prev);
  };

  const handleClickBackBtn = () => {
    setIsOpenAllAnswerModal(false);
  };

  useEffect(() => {
    if (sortType === 'NEW' && inView && recentHasNextPage) {
      fetchRecentNextPage();
    }
    if (sortType === 'RECOMMEND' && inView && recommendHasNextPage) {
      fetchRecommendNextPage();
    }
  }, [
    inView,
    fetchRecommendNextPage,
    fetchRecentNextPage,
    recentHasNextPage,
    recommendHasNextPage,
    sortType,
  ]);

  useEffect(() => {
    if (recommendOrderAnswerData && sortType === 'RECOMMEND') {
      setFilteredResponses(
        recommendOrderAnswerData?.pages.flatMap((page) =>
          page.answers.filter((response) => response.userId !== userId),
        ),
      );
    }
    if (recentOrderAnswerData && sortType === 'NEW') {
      setFilteredResponses(
        recentOrderAnswerData?.pages.flatMap((page) =>
          page.answers.filter((response) => response.userId !== userId),
        ),
      );
    }
  }, [recommendOrderAnswerData, recentOrderAnswerData, sortType, userId]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          `fixed flex w-screen h-screen top-0 left-0 z-[60] bg-gray-800/80 items-center justify-center mobile:hidden ${isOpenDeleteModal && 'hidden'}`,
        )}
      ></div>
      <main className="fixed left-0 top-0 z-[60] flex h-screen w-screen items-center justify-center mobile:flex-col">
        <div className="fixed top-0 z-[997] flex h-14 w-full items-center justify-center border border-gray-200 bg-white tablet:hidden desktop:hidden">
          <Image
            className="absolute left-3 top-4"
            onClick={handleClickBackBtn}
            width={24}
            height={24}
            src="/images/icons/icon-chevron_left_l.svg"
            alt="뒤로가기"
          />
          <h1 className="text-center text-[17px] font-semibold text-[#343943]">
            다같이 면접기출
          </h1>
        </div>
        <div className="flex max-h-screen w-screen justify-center overflow-y-auto py-10 mobile:h-screen mobile:bg-white mobile:py-0">
          <div className="relative h-full w-[688px] rounded-md bg-white px-[100px] py-[80px] mobile:w-screen mobile:rounded-none mobile:px-0">
            <Image
              className="absolute right-6 top-6 cursor-pointer mobile:hidden"
              onClick={handleClickCloseBtn}
              src="/images/icons/icon-close-m.svg"
              width={24}
              height={24}
              alt="닫기"
            />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-[30px] mobile:px-4">
                <div className="flex flex-col gap-4">
                  <div className="relative flex w-full items-center justify-between">
                    <div
                      className={`flex h-[30px] w-fit items-center justify-center gap-1 rounded-sm  px-[12px] py-[6px] text-2xs font-semibold ${myWriteAnswerData ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                    >
                      {myWriteAnswerData ? (
                        <>
                          <Image
                            src="/images/icons/icon-check-white.svg"
                            alt="참여완료"
                            width={14}
                            height={14}
                          />
                          <p>참여완료</p>
                        </>
                      ) : (
                        <p>미참여</p>
                      )}
                    </div>
                    <Select
                      onValueChange={(value) => {
                        handleSelectWeek(value);
                      }}
                    >
                      <SelectTrigger className="p-0 font-medium text-gray-500">
                        <SelectValue placeholder={weeks[0].label} />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="z-[999] mt-1 h-[253px] w-[135px]"
                      >
                        <SelectGroup className="my-2 flex flex-col justify-start rounded-sm border border-gray-200 bg-white py-2 shadow-sm">
                          {weeks.map((v) => (
                            <div key={v.label}>
                              <SelectItem
                                className={cn(
                                  `h-[41px] pl-4 text-sm font-medium ${v.label === filter ? 'bg-muted !text-blue-500 hover:!text-blue-500' : 'text-gray-700'}`,
                                )}
                                value={v.label}
                                onClick={() => setSelectedDate(v.start)}
                              >
                                {v.label}
                              </SelectItem>
                            </div>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <h1 className="text-4xl font-bold">
                    {removeNewlines(interviewData?.content || '')}
                  </h1>
                </div>
                {myWriteAnswerData && (
                  <MyAnswerSection
                    interviewId={interviewData?.weeklyInterviewId || 1}
                    myWriteAnswerData={myWriteAnswerData}
                    userId={userId}
                    pivotDate={selectedDate}
                    accessToken={accessToken}
                  />
                )}
              </div>
              <div className="relative h-[84px] w-full">
                <Image src="/images/gift-banner2.svg" fill alt="banner" />
              </div>

              <div className="mt-2 flex flex-col gap-3 mobile:px-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold">
                    다른 지원자들의 답변{' '}
                    <span className="text-blue-500">
                      {filteredResponses.length}
                    </span>
                  </h4>
                  <div
                    className={`flex items-center gap-1 text-xs font-semibold text-gray-400 `}
                  >
                    <div
                      className={`cursor-pointer ${sortType === 'NEW' && 'text-gray-700'}`}
                      onClick={() => setSortType('NEW')}
                    >
                      최신순
                    </div>
                    <div className="h-3 w-px border border-gray-200"></div>
                    <div
                      className={`cursor-pointer ${sortType === 'RECOMMEND' && 'text-gray-700'}`}
                      onClick={() => setSortType('RECOMMEND')}
                    >
                      추천순
                    </div>
                  </div>
                </div>

                <ul>
                  {filteredResponses.length === 0 && (
                    <p className="font-medium text-gray-500">
                      아직 답변이 없어요.
                    </p>
                  )}
                  {
                    <>
                      {filteredResponses.length >= 1 &&
                        filteredResponses.map(
                          (v: AnswerListData, i: number) => (
                            <li
                              key={v.weeklyInterviewAnswerId}
                              className="mt-6 flex flex-col gap-4"
                            >
                              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                                <div className="flex items-center gap-1">
                                  <div className="relative size-6 overflow-hidden rounded-full">
                                    <Image
                                      src={
                                        v.profileImg.startsWith('https')
                                          ? v.profileImg
                                          : DEFAULT_IMAGE_URL
                                      }
                                      fill
                                      alt="프로필 이미지"
                                    />
                                  </div>
                                  <p className="text-[15px] font-medium text-gray-600">
                                    {v.nickname}
                                  </p>
                                </div>
                                <p className="text-sm font-medium text-gray-500">
                                  {v.job}
                                </p>
                              </div>
                              <p>
                                {i < 3 && (
                                  <span className="mr-1 h-[22px] w-[45px] items-center rounded-[4px] bg-red-100 px-[7px] py-[3px] text-2xs font-semibold text-[#ff5a61]">
                                    BEST
                                  </span>
                                )}
                                <span>{v.content}</span>
                              </p>
                              <div className="relative flex items-center justify-between">
                                {countIndex === i && isOpenMoreMenu && (
                                  <div className="absolute right-6 flex h-[41px] w-[135px] cursor-pointer flex-col justify-center rounded-sm border border-gray-200 bg-white text-[14px] font-medium text-gray-700 hover:bg-gray-50">
                                    <span className="absolute left-4">
                                      신고하기
                                    </span>
                                  </div>
                                )}

                                <Button
                                  className={cn(
                                    `flex h-[36px] w-fit gap-1 px-3 py-2 border-gray-200 font-semibold ${v.isRecommended ? 'text-blue-500' : 'text-gray-600'} `,
                                  )}
                                  variant="outline"
                                  onClick={() =>
                                    recommendMutation({
                                      isRecommended: v.isRecommended,
                                      answerId: v.weeklyInterviewAnswerId,
                                    })
                                  }
                                >
                                  <Image
                                    src={
                                      v.isRecommended
                                        ? '/images/icons/icon-like-blue.svg'
                                        : '/images/icons/icon-like.svg'
                                    }
                                    width={20}
                                    height={20}
                                    alt="icon"
                                  />
                                  <p className="text-xs">
                                    추천 {v.recommendCount}
                                  </p>
                                </Button>

                                <Image
                                  src="/images/icons/icon-more-vertical.svg"
                                  width={24}
                                  height={24}
                                  alt="더보기"
                                  className="cursor-pointer"
                                  onClick={(e) => handleClickMoreMenu(e, i)}
                                />
                              </div>
                              <hr className="mt-2" />
                            </li>
                          ),
                        )}
                    </>
                  }
                  {!isLoading && <div ref={triggerRef}></div>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
