import Heading from './components/heading';
import QuestionList from './components/question-list';
import ResponseCompletionRate from './components/response-completion-rate';

const Page = () => {
  return (
    <div className="pl-[7%]">
      <Heading />
      <main className="mb-10 flex h-auto w-[996px] gap-6 mobile:w-[93%]">
        <QuestionList className="mt-2 h-auto w-[690px] overflow-hidden" />
        <ResponseCompletionRate className="h-[787px] w-[306px] mobile:hidden" />
      </main>
    </div>
  );
};
export default Page;
