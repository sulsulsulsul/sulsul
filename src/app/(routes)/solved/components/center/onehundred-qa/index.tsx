import Image from 'next/image';

import CircularDeterminate from './gradient-circular-progress';
import Progress from './progress';

const OnehundredQa = () => {
  // 더미 데이터
  const dummyData = [
    {
      image: 'lv1',
      title: '최다 빈출 기본질문',
      total: 10,
      done: 10,
      top: 25,
      left: 0,
    },
    {
      image: 'lv2',
      title: '직무역량 & 경험 1',
      total: 18,
      done: 9,
      top: 25,
      left: 80,
    },
    {
      image: 'lv3',
      title: '직무역량 & 경험 2',
      total: 18,
      done: 4,
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
  ];

  const totalDoneData = dummyData.reduce((sum, item) => sum + item.done, 0);

  return (
    <>
      <p className="mb-[8px] mt-[42px] flex items-center gap-1 text-3xl font-bold">
        <Image
          src="/images/icons/icon-flag.svg"
          width={32}
          height={32}
          alt="icon"
        />
        백문백답 첼린지
      </p>
      <div className="mb-[42px] rounded-md border border-gray-200 bg-white p-[28px] shadow-base">
        <Progress totalDoneData={totalDoneData} />
        <CircularDeterminate dummyData={dummyData} />
      </div>
    </>
  );
};
export default OnehundredQa;
