'use client';

import { LineProgressBar } from '@frogress/line';

import { MyTotalChallengesProgressData } from '@/entities/types/challenges';

import UseUserTotalChallengesProgress from '../../../question/hook/use-user-total-challenges-progress';

const Progress = ({
  accessToken,
  processData,
}: {
  accessToken: string;
  processData: MyTotalChallengesProgressData;
}) => {
  const { data } = UseUserTotalChallengesProgress({
    accessToken,
  });

  return (
    <>
      <p className="mb-0 text-2xs text-gray-500">챌린지 진행상황</p>
      <div className="mb-[8px] flex justify-between">
        <p className="text-4xl font-bold text-blue-500">
          {processData.totalCount}/100
          <span className="mt-[3px] text-xs text-blue-500">개</span>
        </p>
        <p className="text-xl text-gray-700 mobile:hidden">
          지원자들 중
          <span className="text-xl font-bold text-gray-900">
            {' '}
            상위 {processData.percent || 100}%
          </span>
          에 속해요
        </p>
        <p className="text-xl text-gray-700 tablet:hidden desktop:hidden">
          <span className="text-xl font-bold text-gray-900">
            {' '}
            상위 {processData.percent || 100}%
          </span>
          에 속해요
        </p>
      </div>

      <LineProgressBar
        progressStyle={{ width: '100%' }}
        percent={processData.totalCount || 0}
        rounded={36}
        height={8}
        progressColor="#576DFC"
        className="w-full"
      />
    </>
  );
};

export default Progress;
