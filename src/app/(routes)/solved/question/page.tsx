import { Solved } from '@/views/solved';

import Heading from './components/heading';
import QuestionList from './components/question-list';
import ResponseCompletionRate from './components/response-completion-rate';

const Page = () => {
  return (
    <>
      <Heading />
      <main className="flex items-start gap-6">
        <QuestionList className="h-[75px] w-[690px]" />
        <ResponseCompletionRate className="h-auto w-[306px]" />
      </main>
    </>
  );
};
export default Page;
