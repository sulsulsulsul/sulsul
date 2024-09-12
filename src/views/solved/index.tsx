import { MyActivitySection } from '@/entities/solved/components/my-activity-section';
import { TogetherSolvedSection } from '@/entities/solved/components/together-solved-section';
import { WeekRankingSection } from '@/entities/solved/components/week-ranking-section';

export const Solved = () => {
  return (
    <main className="flex w-full gap-6 px-5">
      <div className="flex flex-col gap-[30px]">
        <MyActivitySection />
        <WeekRankingSection />
      </div>
      <TogetherSolvedSection />
    </main>
  );
};
