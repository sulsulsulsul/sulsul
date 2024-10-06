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
  const [isMobile, setIsMobile] = useState<boolean>(false); // 모바일 여부 상태
  const { data } = useUserChallengesProgress({
    accessToken,
  });

  // 윈도우 사이즈 체크
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 375);
  };

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 현재 창 크기를 기준으로 상태를 설정
    handleResize();

    // 윈도우 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setQaData([
          {
            image: 'lv1',
            title: '최다 빈출 기본질문',
            total: 10,
            done: data[0].count,
            top: isMobile ? -50 : 25,
            left: isMobile ? 20 : 0,
          },
          {
            image: 'lv2',
            title: '직무역량 & 경험 1',
            total: 18,
            done: data[1].count,
            top: isMobile ? -50 : 25,
            left: isMobile ? 50 : 80,
          },
          {
            image: 'lv3',
            title: '직무역량 & 경험 2',
            total: 18,
            done: data[2].count,
            top: isMobile ? -15 : 221,
            left: isMobile ? 20 : 60,
          },
          {
            image: 'lv4',
            title: '회사 로열티 & 컬쳐핏 1',
            total: 19,
            done: data[3].count,
            top: isMobile ? -15 : 90,
            left: isMobile ? 50 : 105,
          },
          {
            image: 'lv5',
            title: '회사 로열티 & 컬쳐핏 2',
            total: 20,
            done: data[4].count,
            top: isMobile ? 20 : 290,
            left: isMobile ? 20 : -125,
          },
          {
            image: 'lv6',
            title: '가치관 & 비전',
            total: 15,
            done: data[5].count,
            top: isMobile ? 20 : 290,
            left: isMobile ? 45 : -45,
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
          top: isMobile ? -50 : 25,
          left: isMobile ? 20 : 0,
        },
        {
          image: 'lv2',
          title: '직무역량 & 경험 1',
          total: 18,
          done: 0,
          top: isMobile ? -50 : 25,
          left: isMobile ? 50 : 80,
        },
        {
          image: 'lv3',
          title: '직무역량 & 경험 2',
          total: 18,
          done: 0,
          top: isMobile ? -15 : 221,
          left: isMobile ? 20 : 60,
        },
        {
          image: 'lv4',
          title: '회사 로열티 & 컬쳐핏 1',
          total: 19,
          done: 0,
          top: isMobile ? -15 : 90,
          left: isMobile ? 50 : 105,
        },
        {
          image: 'lv5',
          title: '회사 로열티 & 컬쳐핏 2',
          total: 20,
          done: 0,
          top: isMobile ? 20 : 290,
          left: isMobile ? 20 : -125,
        },
        {
          image: 'lv6',
          title: '가치관 & 비전',
          total: 15,
          done: 0,
          top: isMobile ? 20 : 290,
          left: isMobile ? 45 : -45,
        },
      ]);
    }
  }, [data, isMobile]);

  return (
    <div className="w-full">
      <Heading />
      <div className="mb-[42px] w-full rounded-md border border-gray-200 bg-white p-[28px] shadow-base mobile:px-[10px] mobile:py-[20px]">
        <Progress accessToken={accessToken} />
        <CircularDeterminate qaData={qaData} accessToken={accessToken} />
      </div>
    </div>
  );
};
export default OnehundredQa;
