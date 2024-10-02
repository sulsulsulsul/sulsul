'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { FeedbackSectionComplete } from '@/entities/archives/components/feedback-section-complete';
import { FeedbackSectionIdle } from '@/entities/archives/components/feedback-section-idle';
import { useFeedback } from '@/entities/feedbacks/hooks/use-feedback';

interface FeedBackPropsType {
  questionId: number;
  isAnswered: boolean;
}

const Feedback = ({ questionId, isAnswered }: FeedBackPropsType) => {
  const { feedback, refetch } = useFeedback(questionId);
  const [isAnswerChanged, setIsAnswerChanged] = useState(false);
  console.log(feedback);

  const handleAnswerChanged = () => {
    setIsAnswerChanged(false);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold ">내 답변 피드백</h3>
      <div className="mt-2 w-[580px]">
        {!feedback ? (
          <FeedbackSectionIdle
            questionId={questionId}
            isAnswered={isAnswered}
            refetch={refetch}
          />
        ) : (
          <FeedbackSectionComplete
            goodFeedback={feedback?.goodPoint}
            badFeedback={feedback?.improvePoint}
            isAnswerChanged={isAnswerChanged}
            handleAnswerChanged={handleAnswerChanged}
            questionId={questionId}
          />
        )}
      </div>
    </div>
  );
};

export default Feedback;
