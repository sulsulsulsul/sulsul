'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  AlertDialogContent,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';

import { AlertDialog, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { SignInView } from '@/entities/auth/views/sign-in-view';
import useQuestionTypeStore from '@/store/questionListTypeStore';

interface DataType {
  value: number;
  item: QaDataType;
  accessToken: string;
  category: string;
}

const GradientCircularProgress = ({
  value,
  item,
  accessToken,
  category,
}: DataType) => {
  const radius = 50; // 원의 반지름
  const strokeWidth = 4; // 선의 굵기
  const circumference = 2 * Math.PI * radius; // 원의 둘레
  const offset = circumference - (value / 100) * circumference; // 프로그레스 바의 길이 조절
  const router = useRouter();
  const { setSelectedCategory } = useQuestionTypeStore((state) => ({
    setSelectedCategory: state.setSelectedCategory,
  }));

  const handleClickImg = (category: string) => {
    if (category === '최다 빈출 기본질문') {
      setSelectedCategory('BASIC');
    } else if (category === '직무역량 & 경험 1') {
      setSelectedCategory('JOB_1');
    } else if (category === '직무역량 & 경험 2') {
      setSelectedCategory('JOB_2');
    } else if (category === '회사 로열티 & 컬쳐핏 1') {
      setSelectedCategory('CULTURE_1');
    } else if (category === '회사 로열티 & 컬쳐핏 2') {
      setSelectedCategory('CULTURE_2');
    } else if (category === '가치관 & 비전') {
      setSelectedCategory('VISION');
    }

    if (accessToken) {
      router.push('/solved/question');
    }
  };

  return (
    <div
      className="positon relative inline-flex"
      style={{
        top: item.top,
        left: item.left,
      }}
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
          strokeLinecap="round"
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
      <div className="absolute bottom-5 left-0 right-5 top-0 flex w-[124px] flex-col content-center justify-center">
        {item.title === '최다 빈출 기본질문' && value !== 100 ? (
          <>
            <Image
              src={`/images/lv/ingSticker.svg`}
              width={52}
              height={26}
              alt="진행중 딱지 이미지"
              style={{
                position: 'absolute',
                top: '10px',
                left: '70px',
                cursor: 'pointer',
              }}
            />
            <AlertDialog>
              <AlertDialogTrigger>
                <Image
                  src={`/images/lv/${item.image}.svg`}
                  width={49}
                  height={46}
                  alt={`${item.image} 캐릭터 이미지`}
                  style={{
                    position: 'absolute',
                    top: '35px',
                    left: '35px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleClickImg(category)}
                />
              </AlertDialogTrigger>
              {!accessToken && (
                <AlertDialogContent>
                  <AlertDialogTitle />
                  <SignInView callbackUrl="/" />
                </AlertDialogContent>
              )}
            </AlertDialog>
          </>
        ) : value !== 0 && value !== 100 ? (
          <>
            <Image
              src={`/images/lv/ingSticker.svg`}
              width={52}
              height={26}
              alt="진행중 딱지 이미지"
              style={{
                position: 'absolute',
                top: '10px',
                left: '70px',
                cursor: 'pointer',
              }}
            />

            <Image
              src={`/images/lv/${item.image}.svg`}
              width={49}
              height={46}
              alt={`${item.image} 캐릭터 이미지`}
              style={{
                position: 'absolute',
                top: '35px',
                left: '35px',
                cursor: 'pointer',
              }}
              onClick={() => handleClickImg(category)}
            />
          </>
        ) : value === 100 ? (
          <Image
            src={`/images/lv/${item.image}.svg`}
            width={49}
            height={46}
            alt={`${item.image} 캐릭터 이미지`}
            style={{
              position: 'absolute',
              top: '35px',
              left: '35px',
              cursor: 'pointer',
            }}
            onClick={() => handleClickImg(category)}
          />
        ) : (
          <Image
            src={`/images/lv/icon-lock.svg`}
            width={29}
            height={26}
            alt={`${item.image} 캐릭터 이미지`}
            style={{
              position: 'absolute',
              top: '45px',
              left: '45px',
              cursor: 'pointer',
            }}
          />
        )}
        <div className="absolute bottom-[-60px] flex w-full flex-col items-center justify-center">
          <p className="text-nowrap text-base font-bold text-gray-700">
            {item.title}
          </p>
          <p className="text-xs font-medium text-gray-500">
            {item.done}/{item.total}개
          </p>
        </div>
      </div>
    </div>
  );
};

interface QaDataType {
  image: string;
  title: string;
  total: number;
  done: number;
  top: number;
  left: number;
}

export default function App({
  qaData,
  accessToken,
  isMobileView,
}: {
  qaData: QaDataType[];
  accessToken: string;
  isMobileView: boolean;
}) {
  return (
    <div className="mb-7 flex w-full justify-center mobile:mb-0">
      {isMobileView && (
        <div className="bg-container mt-20 h-[451px] w-[50%] min-w-[300px] bg-[url('/images/lv/mobileLine.svg')] bg-top bg-no-repeat">
          {qaData.map((item: QaDataType, index: number) => (
            <GradientCircularProgress
              key={index}
              value={(item.done * 100) / item.total}
              item={item}
              accessToken={accessToken}
              category={item.title}
            />
          ))}
        </div>
      )}
      {!isMobileView && (
        <div className="bg-container h-[571px] w-[460px] bg-[url('/images/lv/line.svg')] bg-center bg-no-repeat">
          {qaData.map((item: QaDataType, index: number) => (
            <GradientCircularProgress
              key={index}
              value={(item.done * 100) / item.total}
              item={item}
              accessToken={accessToken}
              category={item.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}
