import Image from 'next/image';

import { cn } from '@/lib/utils';

import LikeButton from '../../like-button';

import crownIcon from '/public/images/icons/icon-crown.svg';

interface RankProps {
  donationNo: number;
  rank: number;
  donorName: string;
  likeCount: number;
}

function RankItem({ donationNo, rank, donorName, likeCount }: RankProps) {
  return (
    <div className="flex w-[256px] justify-between">
      <div className="flex items-center">
        {rank <= 3 ? (
          <Image
            src={crownIcon}
            alt="왕관"
            width={24}
            height={24}
            className="mr-1"
          />
        ) : (
          <span className="mr-[10.5px] pl-[6.5px] text-lg font-semibold text-gray-500">
            {rank}
          </span>
        )}
        <p
          className={cn('mr-[2px] text-lg font-bold text-gray-800', {
            'text-gray-300': likeCount === -1,
          })}
        >
          {donorName}
        </p>
        <span
          className={cn('text-sm font-semibold text-gray-500', {
            hidden: likeCount === -1,
          })}
        >
          님
        </span>
      </div>
      {likeCount !== -1 && (
        <LikeButton initialLikes={likeCount} donationNo={donationNo} />
      )}
    </div>
  );
}

export default RankItem;
