'use client';

import Image from 'next/image';

import useQuestionTypeStore from '@/store/questionListTypeStore';

const Heading = () => {
  const { selectedCategory } = useQuestionTypeStore();

  let category = '';
  let count = 0;
  if (selectedCategory === 'BASIC') {
    category = '최다 빈출 기본질문';
    count = 10;
  } else if (selectedCategory === 'JOB_1' || selectedCategory === 'JOB_2') {
    category = '직무역량 & 경험';
    count = 18;
  } else if (selectedCategory === 'CULTURE_1') {
    category = '회사 로열티 & 컬쳐핏';
    count = 18;
  } else if (selectedCategory === 'CULTURE_2') {
    category = '회사 로열티 & 컬쳐핏';
    count = 20;
  } else if (selectedCategory === 'VISION') {
    category = '가치관 & 비전';
    count = 15;
  }

  return (
    <p className="mb-[4] flex gap-1 pl-[77px] text-4xl font-bold">
      <Image
        src="/images/icons/etc-speech.svg"
        width={32}
        height={32}
        alt="icon"
      />
      {category} <span className="text-blue-500">{count}</span>
    </p>
  );
};

export default Heading;
