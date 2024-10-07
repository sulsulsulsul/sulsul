'use client';

import { useGetRanking } from '@/entities/donation/hooks/use-get-ranking';

import RankItem from './rank-item';

const rankPlaceholder = [
  {
    donationNo: -2,
    rank: 2,
    donorName: '후원 시, 성함이 위와 같이 표기돼요.',
    likeCount: -1,
  },
  {
    donationNo: -3,
    rank: 3,
    donorName: '따뜻한 마음을 기다리고 있어요.',
    likeCount: -1,
  },
  {
    donationNo: -4,
    rank: 4,
    donorName: '다음 주인공은 누구?',
    likeCount: -1,
  },
  {
    donationNo: -5,
    rank: 5,
    donorName: '랭킹이 채워지는 그날까지',
    likeCount: -1,
  },
];

function Rank() {
  const { ranking } = useGetRanking();

  const displayRanking =
    ranking && ranking.length >= 5
      ? ranking
      : [
          ...(ranking || []),
          ...rankPlaceholder.slice(0, 5 - (ranking?.length || 0)),
        ];

  return (
    <div className="flex flex-col gap-4">
      {displayRanking?.map((item) => (
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
