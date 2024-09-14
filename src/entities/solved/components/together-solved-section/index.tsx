import { TogetherSolvedAvatar } from '../together-solved-avatar';
import { TogetherSolvedContent } from '../together-solved-content';
import { TogetherSolvedHeader } from '../together-solved-header';

export const TogetherSolvedSection = () => {
  return (
    <section className="flex flex-1 flex-col gap-2 px-4 md:px-0 lg:px-0">
      <TogetherSolvedHeader />
      <div className="flex h-[520px] w-full flex-col items-center justify-center gap-5 rounded-md border border-gray-200 bg-white shadow-base">
        <TogetherSolvedContent />
        <TogetherSolvedAvatar />
      </div>
    </section>
  );
};
