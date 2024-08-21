'use client';

import { SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PaginationDemo } from '@/app/(routes)/archive/(list)/components/pagination';
import { Button } from '@/components/ui/button';
import { useArchives } from '@/entities/archives/hooks';
import { PracticedQuestionTabType } from '@/entities/dashboard/types';
import {
  usePracticeResultStore,
  usePracticeStore,
} from '@/store/practiceStore';

import { PracticedQuestionTab } from '../../dashboard/components/practice-question-tab';
import PracticeSectionHeader from '../../dashboard/components/practice-section-header';
import { QuestionDetailType } from '../../types/question';
import { useCreatePractice } from '../practice-modal/hooks';
import { FilterType, HintType, QuestionState } from '../types';
import PracticeListItem from './components/practice-list-item';
import { PracticeListTab } from './components/practice-list-tab';
import PracticeListHeader from './components/pratice-list-header';
import { usePracticeList } from './hook/use-get-practice-list';

//TODO: Robin Change naming for qstate
export default function PracticeList() {
  const [filter, setFilter] = useState<FilterType>('recent');
  const [hint, setHint] = useState<HintType>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedQuestionList, setSelectedQuestionList] = useState<
    QuestionDetailType[]
  >([]);

  const MAX_QEUSTION_COUNT = 6;
  const [tabChange, setTabChange] = useState<QuestionState>('all');

  const { questions, isSuccess } = usePracticeList();

  const answeredQuestions =
    questions &&
    questions.filter((value) => {
      return value.practiceStatus === 'ANSWER';
    });
  const notAnsweredQuestions =
    questions &&
    questions.filter((value) => {
      return (
        value.practiceStatus === 'NOT_ANSWER' ||
        value.practiceStatus === 'NOT_PRACTICE'
      );
    });

  const modifiedByQuestionState =
    tabChange === 'all'
      ? questions
      : tabChange === 'answer'
        ? answeredQuestions
        : notAnsweredQuestions;

  const modifiedByHint =
    modifiedByQuestionState &&
    modifiedByQuestionState?.filter((value) => {
      return (
        (hint === 'on' && value.isHint) ||
        (hint === 'off' && !value.isHint) ||
        hint === 'default'
      );
    });

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

  const modifiedByFilter = modifiedByHint && handleSortByFilter(modifiedByHint);

  useEffect(() => {
    setCurrentPage(1);
  }, [hint, tabChange, isSuccess]);

  const { setStore } = usePracticeStore();

  const mutation = useCreatePractice();

  const router = useRouter();

  const pageIndex =
    questions && Math.ceil(modifiedByHint!.length / MAX_QEUSTION_COUNT);

  const handlePractice = async () => {
    await mutation.mutate(
      selectedQuestionList.flatMap((value) => value.questionId),
      {
        onSuccess: (data) => {
          setStore({
            timer: true,
            practiceList: selectedQuestionList,
            practiceId: data,
          }),
            router.push('/practice/ing');
        },
      },
    );
  };

  return (
    <section className="flex w-[1200px] flex-col">
      {isSuccess ? (
        <>
          <div className="mb-8 flex w-full flex-row justify-between">
            <div className="flex flex-col gap-3">
              <PracticeSectionHeader
                title="연습한 면접질문"
                iconSrc="/images/icons/etc-speech.svg"
              />
              <PracticeListTab
                onTabChange={setTabChange}
                allCount={questions!.length}
                unansweredCount={notAnsweredQuestions!.length}
                answeredCount={answeredQuestions!.length}
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
          <PracticeListHeader setFilter={setFilter} setHint={setHint} />
          <div className="mb-[60px]  flex flex-col  gap-3 overflow-scroll">
            {modifiedByFilter &&
              modifiedByFilter.map((value, index) => {
                return (
                  index + 1 <= MAX_QEUSTION_COUNT * currentPage &&
                  index + 1 > MAX_QEUSTION_COUNT * (currentPage - 1) && (
                    <PracticeListItem
                      key={value.questionId}
                      question={value}
                      setSelectQuestion={setSelectedQuestionList}
                    />
                  )
                );
              })}
          </div>
          <div className="fixed bottom-0 left-0 h-[60px] w-screen justify-center bg-gray-50 pt-3.5">
            <PaginationDemo
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={pageIndex!}
            />
          </div>
        </>
      ) : (
        <>loading</>
      )}
    </section>
  );
}
