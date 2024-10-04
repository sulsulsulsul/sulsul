import Heading from './components/heading';
import QuestionList from './components/question-list';
import ResponseCompletionRate from './components/response-completion-rate';

const Page = () => {
  return (
    <>
      <Heading />
      <main className="mb-10 flex h-auto justify-center gap-6">
        <QuestionList className="mt-2 h-auto w-[690px]" />
        <ResponseCompletionRate className="h-[787px] w-[306px] " />
      </main>
    </>
  );
};
export default Page;
