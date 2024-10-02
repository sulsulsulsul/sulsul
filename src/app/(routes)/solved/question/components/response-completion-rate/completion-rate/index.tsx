'use client';
import { useEffect, useState } from 'react';
import { LineProgressBar } from '@frogress/line';

import { MyChallengesProgressData } from '@/entities/types/challenges';

const CompletionRate = ({ data }: { data: MyChallengesProgressData[] }) => {
  const totalCount = data.reduce(
    (accumulator: number, current: { count: number }) => {
      return accumulator + current.count;
    },
    0,
  );

  return (
    <div className="mb-[32px] mt-[20px]">
      <div className="mb-[10px] flex justify-between">
        <p className="text-base font-bold text-gray-800">답변 작성률 </p>
        <p className="text-base font-semibold text-gray-600">{totalCount}%</p>
      </div>
      <LineProgressBar percent={Number(totalCount)} rounded={36} height={8} />
    </div>
  );
};

export default CompletionRate;
