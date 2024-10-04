import Image from 'next/image';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import OnehundredQa from '@/app/(routes)/solved/components/onehundred-qa';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import {
  interviewOptions,
  myActivityOptions,
} from '@/app/api/solved/query-options';
import { BestCommentsSection } from '@/entities/solved/components/best-comments-section';
import { MyActivitySection } from '@/entities/solved/components/my-activity-section';
import { TogetherSolvedSection } from '@/entities/solved/components/together-solved-section';
import { WeekRankingSection } from '@/entities/solved/components/week-ranking-section';
import { getQueryClient } from '@/lib/tanstack-query/client';
import { formatDate } from '@/shared/helpers/date-helpers';

export const Solved = async () => {
  const authInfo = await auth();
  const userId = authInfo?.user.auth.userId || 0;
  const accessToken = authInfo?.user.auth.accessToken || '';
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });

  const queryClient = getQueryClient();
  queryClient.prefetchQuery(myActivityOptions(userId, accessToken));
  queryClient.prefetchQuery(interviewOptions(pivotDate));

  return (
    <main className="flex w-full gap-6">
      <div className="hidden lg:flex lg:w-[282px] lg:flex-col lg:gap-[30px]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MyActivitySection
            userId={Number(userId)}
            accessToken={accessToken}
          />
          <WeekRankingSection accessToken={accessToken} />
        </HydrationBoundary>

        <Image
          src="/images/gift-banner.svg"
          width={282}
          height={147}
          alt="banner"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 md:px-0 lg:px-0">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TogetherSolvedSection />
        </HydrationBoundary>
        <OnehundredQa accessToken={accessToken} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BestCommentsSection accessToken={accessToken} />
      </HydrationBoundary>
    </main>
  );
};
