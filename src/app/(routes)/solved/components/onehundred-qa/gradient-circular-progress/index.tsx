import * as React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

const GradientCircularProgress = ({ value, item }: any) => {
  const radius = 50; // 원의 반지름
  const strokeWidth = 4; // 선의 굵기
  const circumference = 2 * Math.PI * radius; // 원의 둘레
  const offset = circumference - (value / 100) * circumference; // 프로그레스 바의 길이 조절

  return (
    <Box
      position="relative"
      display="inline-flex"
      top={item.top}
      left={item.left}
    >
      <svg width={124} height={124}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#83D1FF" />
            <stop offset="100%" stopColor="#F9B2FF" />
          </linearGradient>
        </defs>

        {/* 회색 원 */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#F6F7FB"
          strokeWidth={strokeWidth}
          fill="white"
        />

        {/* 그라데이션 원 */}
        {value !== 0 && (
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="white"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)" // 시작점을 위로 이동
          />
        )}
      </svg>

      <Box
        top={0}
        left={0}
        bottom={5}
        right={5}
        position="absolute"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
      >
        {value !== 0 && value !== 100 && (
          <Image
            src="/images/lv/ingSticker.svg"
            width={52}
            height={26}
            alt="ingSticker"
            style={{
              position: 'absolute',
              top: '10px',
              left: '70px',
              cursor: 'pointer',
            }}
          />
        )}
        {value !== 0 ? (
          <Image
            src={`/images/lv/${item.image}.svg`}
            width={49}
            height={46}
            alt={item.image}
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              cursor: 'pointer',
            }}
          />
        ) : (
          <Image
            src={`/images/lv/icon-lock.svg`}
            width={29}
            height={26}
            alt={item.image}
            style={{
              position: 'absolute',
              top: '45px',
              left: '45px',
              cursor: 'pointer',
            }}
          />
        )}
        <div className="mt-[160px] text-center">
          <p className="text-nowrap text-base font-bold text-gray-700">
            {item.title}
          </p>
          <p className="text-xs font-medium text-gray-500">
            {item.done}/{item.total}개
          </p>
        </div>
      </Box>
    </Box>
  );
};

interface DataType {
  image: string;
  title: string;
  total: number;
  done: number;
  top: number;
  left: number;
}
[];

export default function App({ dummyData }: any) {
  return (
    <div className="mb-7 flex justify-center">
      <div className="bg-container h-[571px] w-[460px] bg-[url('/images/lv/line.svg')] bg-center bg-no-repeat">
        {dummyData.map((item: DataType, index: number) => (
          <GradientCircularProgress
            key={index}
            value={(item.done * 100) / item.total}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
