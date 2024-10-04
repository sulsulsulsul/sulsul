'use client';

import { useEffect, useState } from 'react';

import { useUserChallengesProgress } from '../../question/hook/use-user-challenges-progress';
import CircularDeterminate from './gradient-circular-progress';
import Heading from './heading';
import Progress from './progress';

interface QaDataType {
  image: string;
  title: string;
  total: number;
  done: number;
  top: number;
  left: number;
}

const OnehundredQa = ({ accessToken }: { accessToken: string }) => {
  const [qaData, setQaData] = useState<QaDataType[]>([]);
  const { data } = useUserChallengesProgress({
    accessToken,
  });

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setQaData([
          {
            image: 'lv1',
            title: '최다 빈출 기본질문',
            total: 10,
            done: data[0].count,
            top: 25,
            left: 0,
          },
          {
            image: 'lv2',
            title: '직무역량 & 경험 1',
            total: 18,
            done: data[1].count,
            top: 25,
            left: 80,
          },
          {
            image: 'lv3',
            title: '직무역량 & 경험 2',
            total: 18,
            done: data[2].count,
            top: 215,
            left: 60,
          },
          {
            image: 'lv4',
            title: '회사 로열티 & 컬쳐핏 1',
            total: 19,
            done: data[3].count,
            top: 90,
            left: 105,
          },
          {
            image: 'lv5',
            title: '회사 로열티 & 컬쳐핏 2',
            total: 20,
            done: data[4].count,
            top: 285,
            left: -125,
          },
          {
            image: 'lv6',
            title: '가치관 & 비전',
            total: 15,
            done: data[5].count,
            top: 290,
            left: -45,
          },
        ]);
      }
    } else {
      setQaData([
        {
          image: 'lv1',
          title: '최다 빈출 기본질문',
          total: 10,
          done: 0,
          top: 25,
          left: 0,
        },
        {
          image: 'lv2',
          title: '직무역량 & 경험 1',
          total: 18,
          done: 0,
          top: 25,
          left: 80,
        },
        {
          image: 'lv3',
          title: '직무역량 & 경험 2',
          total: 18,
          done: 0,
          top: 215,
          left: 60,
        },
        {
          image: 'lv4',
          title: '회사 로열티 & 컬쳐핏 1',
          total: 19,
          done: 0,
          top: 90,
          left: 105,
        },
        {
          image: 'lv5',
          title: '회사 로열티 & 컬쳐핏 2',
          total: 20,
          done: 0,
          top: 285,
          left: -125,
        },
        {
          image: 'lv6',
          title: '가치관 & 비전',
          total: 15,
          done: 0,
          top: 290,
          left: -45,
        },
      ]);
    }
  }, [data]);

  return (
    <>
      <Heading />
      <div className="mb-[42px] rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
        <Progress accessToken={accessToken} />
        <CircularDeterminate qaData={qaData} accessToken={accessToken} />
      </div>
    </>
  );
};
export default OnehundredQa;
