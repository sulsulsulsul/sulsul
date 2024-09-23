'use client';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { removeNewlines } from '@/lib/utils';
import { formatDate } from '@/shared/helpers/date-helpers';
import { useUserStore } from '@/store/client';

import { useAnswerList } from '../../hooks/use-get-answer-list';
import { useInterview } from '../../hooks/use-get-interview';
import { useUserAnswer } from '../../hooks/use-get-user-answer';
import { CountDownView } from '../count-down-view';
import { TogetherSolvedHeader } from '../together-solved-header';

export const AnswerCompleteSection = () => {
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });

  const { auth } = useUserStore();
  const { data, image } = useUserStore();
  const userId = auth.userId;
  const { data: currentData, refetch } = useInterview(pivotDate);
  const { data: myWriteAnswerData } = useUserAnswer({
    interviewId: currentData?.weeklyInterviewId || 1,
    userId,
  });

  const { data: answerListData } = useAnswerList({
    interviewId: currentData?.weeklyInterviewId || 0,
    sortType: 'RECOMMEND',
    //   accessToken: accessToken,
    count: 3,
  });

  const filteredResponses = answerListData?.answerDetailResponses.filter(
    (response) => response.userId !== userId,
  );

  if (!currentData?.endTime) return;
  console.log(answerListData);
  return (
    <section className="flex flex-col gap-2">
      <TogetherSolvedHeader />
      <div className="flex h-[712px] w-full flex-col justify-center gap-5 rounded-md border border-gray-200 bg-white p-[50px] shadow-base">
        <div className="flex w-full items-center justify-between">
          <div className="flex h-[30px] w-fit items-center justify-center gap-1 rounded-sm bg-blue-500 px-[12px] py-[6px] text-2xs font-semibold text-white ">
            <Image
              src="/images/icons/icon-check-white.svg"
              alt="참여완료"
              width={14}
              height={14}
            />
            <p>참여완료</p>
          </div>
          <CountDownView endTime={currentData?.endTime} refetch={refetch} />
        </div>

        <h1 className="text-4xl font-bold">
          {removeNewlines(currentData?.content)}
        </h1>

        <h4 className="text-lg font-bold text-gray-700">내가 쓴 답변</h4>
        <p className="text-lg font-medium text-gray-800">
          {myWriteAnswerData?.content}
        </p>
        <div className="flex items-center justify-between">
          <Button
            className="flex h-[36px] w-[71px] gap-1 p-2 text-gray-600"
            variant="outline"
            // onClick={onClickResetContents}
            // disabled={!isResetAvailable}
          >
            <Image
              src="/images/icons/icon-like.svg"
              width={20}
              height={20}
              alt="icon"
            />
            <p className="text-xs">추천</p>
          </Button>
          <Image
            src="/images/icons/icon-more-vertical.svg"
            width={24}
            height={24}
            alt="더보기"
            className="cursor-pointer"
          />
        </div>

        <hr />
        <div className="flex flex-col gap-3">
          <h4 className="text-lg font-bold">
            다른 지원자들의 답변
            <span className="text-blue-500">{answerListData?.totalCount}</span>
          </h4>
          {!filteredResponses ? (
            <div>{data.nickname}님이 첫 답변을 남기셨군요!</div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <div className="flex h-[22px] w-fit items-center justify-center gap-1 rounded-[4px] bg-red-100 px-[12px] py-[6px] text-2xs font-semibold text-[#ff5a61] ">
                    <p>BEST</p>
                  </div>
                  {filteredResponses[0]?.nickname}
                </div>
                <p className="line-clamp-2 font-medium text-gray-800">
                  {filteredResponses[0]?.content}
                </p>
              </div>
              <div className="flex w-full justify-center">
                <Button variant="outline" className="h-12 w-[300px]">
                  답변 모두 보기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
