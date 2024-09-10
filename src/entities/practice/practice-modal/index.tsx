'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { CheckedState } from '@radix-ui/react-checkbox';

import { ArchiveQuestionItem } from '@/entities/types';
import { cn } from '@/lib/utils';
import { usePracticeStore } from '@/store/practiceStore';

import { PracticingListType } from '../../types/question';
import { usePracticeDetail } from '../hooks/use-get-practice-detail';
import ModalHeader from './components/modal-header';
import PracticeModalButton from './components/practice-modal-button';
import PracticeModalOption from './components/practice-modal-option';
import PracticeModalQuestionSection from './components/practice-modal-question-section';
import PracticeModalResumeSection from './components/practice-modal-resume-section';
import { useAllPracticeQuestions, useResumes } from './hooks';
import { useCreatePractice } from './hooks/use-create-practice';

interface PracticeSelectionProp {
  setModal: Dispatch<SetStateAction<boolean>>;
  //TODO: Get ResumeId on dashboard 다시하기 클릭
  //resumeId?: number;
}
export default function PracticeSelection({ setModal }: PracticeSelectionProp) {
  const router = useRouter();

  const { setStore } = usePracticeStore();

  const [selectedArchiveIds, setSelectedArchiveIds] = useState<number[]>([]);
  const [allResume, setAllResume] = useState(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);

  const [finalList, setFinalList] = useState<ArchiveQuestionItem[]>([]);

  const [timer, setTimer] = useState<CheckedState>(false);
  const [random, setRandom] = useState<boolean>(false);

  const mutation = useCreatePractice();

  const { resume } = useResumes();
  const [focusedResume, setFocusedResume] = useState(
    resume ? resume[0].archiveId : 0,
  );

  useEffect(() => {
    //질문이 하나도 선택되어있지 않았을때 다시 체크 박스 OFF
    if (resume) {
      selectedQuestionIds.length === 0 &&
        selectedArchiveIds.length !== 0 &&
        selectedArchiveIds.length !== resume.length &&
        setSelectedArchiveIds((prev) =>
          prev.filter((item) => item !== focusedResume),
        );
    }
  }, [selectedQuestionIds]);

  const reset = useCallback(() => {
    setFocusedResume(0);
    setAllResume(false);
    setSelectedArchiveIds([]);
    setFinalList([]);
  }, []);

  const allQuestions = useAllPracticeQuestions(selectedArchiveIds);

  useEffect(() => {
    if (
      allResume &&
      allQuestions &&
      allQuestions.allQuestions &&
      selectedArchiveIds.length === resume?.length
    ) {
      setFinalList(allQuestions.allQuestions);
    }
  }, [allResume]);

  const shuffledList = useMemo(() => {
    const newList = [...finalList];
    for (let i = finalList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    return newList;
  }, [finalList]);

  const detailedQuestionsIds = random
    ? shuffledList.flatMap((value) => {
        return value.questionId;
      })
    : finalList.flatMap((value) => {
        return value.questionId;
      });

  const { data, refetch } = usePracticeDetail(detailedQuestionsIds);

  const handleSubmit = async () => {
    await refetch();
    await mutation.mutate(
      finalList.flatMap((value) => value.questionId),
      {
        onSuccess: (value) => {
          router.push('/practice/ing'),
            setStore({
              timer: !!timer,
              practiceList: data as PracticingListType[],
              practiceId: value,
            });
        },
      },
    );
  };
  return (
    <div
      className={cn(
        'fixed flex  w-screen h-screen top-0 left-0 z-[60] bg-gray-800/80 items-center justify-center',
      )}
    >
      <div className="flex w-[75rem] flex-col rounded-md border border-gray-100 bg-white">
        <ModalHeader />
        <div className="flex w-full flex-row">
          <PracticeModalResumeSection
            resume={resume!}
            allResume={allResume}
            setAllResume={setAllResume}
            reset={reset}
            selectArchiveIds={selectedArchiveIds}
            setSelectedArchiveIds={setSelectedArchiveIds}
            focusedResume={focusedResume}
            setFocusedResume={setFocusedResume}
          />
          <PracticeModalQuestionSection
            selectedQuestionIds={selectedQuestionIds}
            setSelectedQuestionIds={setSelectedQuestionIds}
            setFinalList={setFinalList}
            focusedResume={focusedResume}
            finalList={finalList}
          />
        </div>
        <section>
          <PracticeModalOption
            random={random}
            setRandom={setRandom}
            setTimer={setTimer}
          />
          <PracticeModalButton
            listCount={detailedQuestionsIds.length}
            setCancel={setModal}
            handleSubmit={handleSubmit}
            setDisable={finalList.length === 0}
          />
        </section>
      </div>
    </div>
  );
}
