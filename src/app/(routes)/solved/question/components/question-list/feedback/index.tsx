'use client';

import { Button } from '@/components/ui/button';

const Feedback = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold ">내 답변 피드백</h3>
      <div className="mt-2 w-[580px]">
        {/* {!feedback && ( */}
        <div>
          <div className="flex h-[157px] flex-col items-center justify-center rounded-base bg-gray-50 text-sm text-gray-500">
            {/* {isLoading ? (
                  <FeedbackSectionPending />
                ) : ( */}
            <>
              <p>피드백 받기 버튼을 누르면</p>
              <p>내 답변에 대한 피드백을 받을 수 있어요!</p>
              <div className="mt-4">
                <Button
                  size="sm"
                  // onClick={handleCreateFeedback}
                  // disabled={!isAnswered}
                >
                  <span className="text-base font-semibold">피드백 받기</span>
                </Button>
              </div>
            </>
            {/* ) */}
          </div>
        </div>
        {/* )} */}
        {/* {feedback?.content && (
              <FeedbackSectionComplete
                goodFeedback={feedback?.goodPoint}
                badFeedback={feedback?.improvePoint}
                isAnswerChanged={isAnswerChanged}
                handleAnswerChanged={handleAnswerChanged}
                questionId={questionId}
            />
        )} */}
      </div>
    </div>
  );
};

export default Feedback;
