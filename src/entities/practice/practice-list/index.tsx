'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PaginationDemo } from '@/app/(routes)/archive/(list)/components/pagination';
import { Button } from '@/components/ui/button';
import { usePracticeStore } from '@/store/practiceStore';

import PracticeSectionHeader from '../../dashboard/components/practice-section-header';
import { QuestionDetailType } from '../../types/question';
import { useCreatePractice } from '../practice-modal/hooks';
import { FilterType, HintType, QuestionState } from '../types';
import PracticeListItem from './components/practice-list-item';
import { PracticeListTab } from './components/practice-list-tab';
import PracticeListHeader from './components/pratice-list-header';
import { usePracticeList } from './hook/use-get-practice-list';

export default function PracticeList() {
  const [filter, setFilter] = useState<FilterType>('recent');
  const [hint, setHint] = useState<HintType>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedQuestionList, setSelectedQuestionList] = useState<
    QuestionDetailType[]
  >([]);
  const [tabChange, setTabChange] = useState<QuestionState>('ALL');

  //TODO: COUNT
  const { questionsList, isSuccess, refetch, isFetching } = usePracticeList({
    practiceStatus: tabChange,
    page: currentPage - 1,
    size: 6,
    hint: hint,
    //star
  });

  // const answeredQuestions =
  //   questionsList &&
  //   questionsList.contents.filter((value) => {
  //     return value.practiceStatus === 'ANSWER';
  //   });

  // const notAnsweredQuestions =
  //   questionsList &&
  //   questionsList.contents.filter((value) => {
  //     return (
  //       value.practiceStatus === 'NOT_ANSWER' ||
  //       value.practiceStatus === 'NOT_PRACTICE'
  //     );
  //   });

  // const modifiedByQuestionState =
  //   tabChange === 'ALL'
  //     ? questionsList?.contents
  //     : tabChange === 'ANSWER'
  //       ? answeredQuestions
  //       : notAnsweredQuestions;

  // const modifiedByHint =
  //   modifiedByQuestionState &&
  //   modifiedByQuestionState?.filter((value) => {
  //     return (
  //       (hint === 'on' && value.hint) ||
  //       (hint === 'off' && !value.hint) ||
  //       hint === 'default'
  //     );
  //   });

  const handleSortByFilter = (value: QuestionDetailType[]) => {
    if (filter === 'recent') {
      return value.sort((a: QuestionDetailType, b: QuestionDetailType) => {
        return (
          new Date(b.lastPracticeAt).valueOf() -
          new Date(a.lastPracticeAt).valueOf()
        );
      });
    } else if (filter === 'old') {
      return value.sort((a: QuestionDetailType, b: QuestionDetailType) => {
        return (
          new Date(a.lastPracticeAt).valueOf() -
          new Date(b.lastPracticeAt).valueOf()
        );
      });
    } else if (filter === 'leastCount') {
      return value.sort((a: QuestionDetailType, b: QuestionDetailType) => {
        return a.practiceCount - b.practiceCount;
      });
    } else if (filter === 'mostCount') {
      return value.sort((a: QuestionDetailType, b: QuestionDetailType) => {
        return b.practiceCount - a.practiceCount;
      });
    }
  };

  const modifiedByFilter =
    questionsList && handleSortByFilter(questionsList.contents);

  useEffect(() => {
    refetch();
  }, [currentPage, tabChange, hint]);

  const { setStore } = usePracticeStore();

  const mutation = useCreatePractice();

  const router = useRouter();

  const handlePractice = async () => {
    // const x = selectedQuestionList.map((value)=>{
    //   return {
    //     questionId: value.questionId,
    //     content: value.content,
    //     answer: ,
    //     isAnswered: value.,
    //     isHint: value.hint,
    //     keywords:[],
    //   }
    // })
    await mutation.mutate(
      selectedQuestionList.flatMap((value) => value.questionId),
      {
        onSuccess: (data) => {
          setStore({
            timer: true,
            // practiceList: selectedQuestionList,
            practiceList: [],
            practiceId: data,
          }),
            router.push('/practice/ing');
        },
      },
    );
  };

  //TODO COUNT ALL where to get
  return (
    <section className="flex w-[1200px] flex-col">
      <>
        <div className="mb-8 flex w-full flex-row justify-between">
          <div className="flex flex-col gap-3">
            <PracticeSectionHeader
              title="연습한 면접질문"
              iconSrc="/images/icons/etc-speech.svg"
            />
            <PracticeListTab
              onTabChange={setTabChange}
              allCount={questionsList?.totalCount!}
              isLoading={isFetching}
              // unansweredCount={notAnsweredQuestions?.length!}
              // answeredCount={answeredQuestions?.length!}
              unansweredCount={0}
              answeredCount={0}
            />
          </div>
          <Button
            className="mt-8 flex w-44 flex-row gap-1"
            variant="default"
            onClick={handlePractice}
          >
            다시 연습하기
            <Image
              src="/images/icons/icon-arrow_up_right.svg"
              width={24}
              height={24}
              alt="icon"
            />
          </Button>
        </div>
        <PracticeListHeader
          setPage={setCurrentPage}
          setFilter={setFilter}
          setHint={setHint}
        />
        {isSuccess && !isFetching ? (
          <div className="mb-[60px]  flex flex-col  gap-3 overflow-scroll">
            {modifiedByFilter &&
              modifiedByFilter.map((value) => {
                return (
                  <PracticeListItem
                    key={value.questionId}
                    question={value}
                    setSelectQuestion={setSelectedQuestionList}
                  />
                );
              })}
          </div>
        ) : (
          <div>로딩중</div>
        )}
        <div className="fixed bottom-0 left-0 h-[60px] w-screen justify-center bg-gray-50 pt-3.5">
          <PaginationDemo
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={questionsList?.totalPage!}
          />
        </div>
      </>
    </section>
  );
}
