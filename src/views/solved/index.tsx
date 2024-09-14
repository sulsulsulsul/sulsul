import Image from 'next/image';

import { BestCommentsSection } from '@/entities/solved/components/best-comments-section';
import { MyActivitySection } from '@/entities/solved/components/my-activity-section';
import { TogetherSolvedSection } from '@/entities/solved/components/together-solved-section';
import { WeekRankingSection } from '@/entities/solved/components/week-ranking-section';

export const Solved = () => {
  return (
    <main className="flex w-full gap-6">
      <div className="flex w-[282px] flex-col gap-[30px]">
        <MyActivitySection />
        <WeekRankingSection />
        <Image
          src="/images/gift-banner.svg"
          width={282}
          height={147}
          alt="banner"
        />
      </div>
      <TogetherSolvedSection />
      <BestCommentsSection />
    </main>
  );
};
