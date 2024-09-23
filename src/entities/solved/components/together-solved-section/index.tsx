import { AnswerCompleteSection } from '../answer-complete-section';
import { NoAnswerCompleteSection } from '../no-answer-complete-section';

export const TogetherSolvedSection = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  return (
    <div>
      <NoAnswerCompleteSection accessToken={accessToken} />
      <AnswerCompleteSection />
    </div>
  );
};
