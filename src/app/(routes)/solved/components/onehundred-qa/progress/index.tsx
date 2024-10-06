'use client';

import { LineProgressBar } from '@frogress/line';

import UseUserTotalChallengesProgress from '../../../question/hook/use-user-total-challenges-progress';

const Progress = ({ accessToken }: { accessToken: string }) => {
  const { data } = UseUserTotalChallengesProgress({
    accessToken,
  });

  return (
    <>
      <p className="mb-0 text-2xs text-gray-500">첼린지 진행상황</p>
      <div className="mb-[8px] flex justify-between">
        <p className="text-4xl font-bold text-blue-500">
          {data?.totalCount || 0}/100
          <span className="mt-[3px] text-xs text-blue-500">개</span>
        </p>
        <p className="text-xl text-gray-700">
          지원자들 중
          <span className="text-xl font-bold text-gray-900">
            {' '}
            상위 {data?.percent || 100}%
          </span>
          에 속해요
        </p>
      </div>
      <LineProgressBar
        percent={data?.totalCount || 0}
        rounded={36}
        height={8}
        progressColor="#576DFC"
      />
    </>
  );
};

export default Progress;
