import { AnswerCompleteSection } from '../answer-complete-section';
import { NoAnswerCompleteSection } from '../no-answer-complete-section';

export const TogetherSolvedSection = () => {
  return (
    <div>
      <NoAnswerCompleteSection />
      <AnswerCompleteSection />
    </div>
  );
};
