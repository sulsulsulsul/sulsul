'use client';

import { useGetRanking } from '@/entities/donation/hooks/use-get-ranking';

import RankItem from './rank-item';

function Rank() {
  const { ranking } = useGetRanking();
  console.log(ranking);
  return (
    <div className="flex flex-col gap-4">
      {ranking?.map((item) => (
        <RankItem
          key={item.donationNo}
          donationNo={item.donationNo}
          rank={item.rank}
          donorName={item.donorName}
          likeCount={item.likeCount}
        />
      ))}
    </div>
  );
}

export default Rank;
