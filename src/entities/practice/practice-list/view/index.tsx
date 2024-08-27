'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PaginationDemo } from '@/app/(routes)/archive/(list)/components/pagination';
import { Button } from '@/components/ui/button';
import PracticeSectionHeader from '@/entities/dashboard/components/practice-section-header';
import { QuestionDetailType } from '@/entities/types/question';
import { useUserStore } from '@/store/client';
import { usePracticeStore } from '@/store/practiceStore';

import { useCreatePractice } from '../../practice-modal/hooks';
import { FilterType, HintType, QuestionState } from '../../types';
import PracticeListItem from '../components/practice-list-item';
import { PracticeListTab } from '../components/practice-list-tab';
import PracticeListHeader from '../components/pratice-list-header';
import { useAllPracticeList } from '../hook/use-get-all-practice-list';
import { usePracticeList } from '../hook/use-get-practice-list';

export default function PracticeList() {
  const [filter, setFilter] = useState<FilterType>('recent');
  const [hint, setHint] = useState<HintType>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedQuestionList, setSelectedQuestionList] = useState<
    QuestionDetailType[]
  >([]);
  const [tabChange, setTabChange] = useState<QuestionState>('ALL');
  const [selectAll, setSelectAll] = useState(false);

  const { auth } = useUserStore();

  const { questionsList } = usePracticeList({
    practiceStatus: tabChange,
    page: currentPage - 1,
    size: 6,
    userId: auth.userId,
    hint: hint,
  });
  // const {data} = useQuery({
  //   queryKey: ['practiceCount'],
  //   queryFn: () => getPrefecthList(),
  // })
  // console.log("a",data?.countAll)

  const { list, isSuccess } = useAllPracticeList();

  const { countAnswer, countNotAnswer } = isSuccess
    ? list!.contents.reduce(
        (counts, item) => {
          item.practiceStatus === 'ANSWER'
            ? counts.countAnswer++
            : counts.countNotAnswer++;
          return counts;
        },
        { countAnswer: 0, countNotAnswer: 0 },
      )
    : { countAnswer: 0, countNotAnswer: 0 };

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
    setSelectAll(false);
  }, [currentPage, tabChange, hint]);

  const { setStore } = usePracticeStore();

  const mutation = useCreatePractice();

  const router = useRouter();

  const handlePractice = async () => {
    selectedQuestionList;
    await mutation.mutate(
      selectedQuestionList.flatMap((value) => value.questionId),
      {
        onSuccess: (data) => {
          setStore({
            timer: true,
            //TODO: FIX THIS PRACTICELIST
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
      <div className="mb-8 flex w-full flex-row justify-between">
        <div className="flex flex-col gap-3">
          <PracticeSectionHeader
            title="연습한 면접질문"
            iconSrc="/images/icons/etc-speech.svg"
          />
          <PracticeListTab
            onTabChange={setTabChange}
            allCount={isSuccess ? list!.totalCount : 0}
            isLoading={!isSuccess}
            unansweredCount={countNotAnswer}
            answeredCount={countAnswer}
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
        setSelectAll={setSelectAll}
        setFilter={setFilter}
        setHint={setHint}
        selectAll={selectAll}
      />
      <div className="mb-[60px]  flex flex-col  gap-3 overflow-scroll">
        {modifiedByFilter &&
          modifiedByFilter.map((value) => {
            return (
              <PracticeListItem
                key={value.questionId}
                selectAll={selectAll}
                question={value}
                setSelectQuestion={setSelectedQuestionList}
              />
            );
          })}
      </div>
      <div className="fixed bottom-0 left-0 h-[60px] w-screen justify-center bg-gray-50 pt-3.5">
        <PaginationDemo
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={questionsList?.totalPage!}
        />
      </div>
    </section>
  );
}
