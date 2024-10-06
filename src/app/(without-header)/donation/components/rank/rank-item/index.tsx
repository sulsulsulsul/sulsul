import Image from 'next/image';

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
          <span className="mr-[10.5px] text-lg font-semibold text-gray-500">
            {rank}
          </span>
        )}
        <p className="mr-[2px] text-lg font-bold text-gray-800">{donorName}</p>
        <span className="text-sm font-semibold text-gray-500">님</span>
      </div>

      <LikeButton initialLikes={likeCount} donationNo={donationNo} />
    </div>
  );
}

export default RankItem;
