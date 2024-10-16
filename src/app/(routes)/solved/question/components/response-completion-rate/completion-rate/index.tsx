'use client';
import { LineProgressBar } from '@frogress/line';

import { useQuestionListStore } from '@/store/questListStore';

const CompletionRate = () => {
  const { questions } = useQuestionListStore();
  return (
    <div className="mb-[32px] mt-[20px]">
      <div className="mb-[10px] flex justify-between">
        <p className="text-lg font-bold text-gray-800">답변 작성률</p>
        <p className="text-lg font-semibold text-gray-600">
          {questions.answerRate}%
        </p>
      </div>
      <LineProgressBar
        percent={Number(questions.answerRate)}
        rounded={36}
        height={8}
        progressColor="#576DFC"
      />
    </div>
  );
};

export default CompletionRate;
