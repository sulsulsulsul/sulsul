import { HTMLAttributes, useEffect, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const INTERVIEW_TIP = [
  `첫인상은 단 3초 만에 결정돼요. \n자연스러운 미소와 아이컨택을 잊지 마세요.`,
  `회사에서 마주치는 사람들에게 인사하세요. \n바로 그분이 면접관이 될 수도 있어요!`,
  `취준생들의 꿈의 직장 1위는 \n2년 연속 ‘네이버’가 차지했어요.`,
  `면접 정장, 무료로 대여하세요! \n‘취업날개 서비스’를 검색해보세요.`,
  `지각은 절대 금물! \n20~30분 전 여유 있게 도착하세요.`,
  `면접 복장은 지원하는 회사의 문화와 \n분위기에 맞춰 선택하는 것이 중요해요.`,
  `면접이 많이 긴장되고 떨린다면 \n면접관을 말하는 감자라고 생각해보세요.`,
  `올해 대졸 신입 희망 연봉은 \n평균 ‘3,600만 원'이에요.`,
  `질문의 의도를 잘 파악해야 해요. \n면접관의 질문엔 항상 숨겨진 의도가 있어요.`,
  `면접장 문을 닫고 나가는 순간까지 \n‘면접 중'이라는 걸 잊지 마세요.`,
  `취준생들이 면접장에서 했던 거짓말 1위는 \n“야근, 주말 근무 모두 괜찮다.”였어요.`,
  `면접 후에는 받았던 질문들을 기록하고, \n부족한 점을 분석해 다음 면접을 준비하세요.`,
];

interface PendingInterviewQuestionProps
  extends HTMLAttributes<HTMLDivElement> {}
export function PendingStatus({ className }: PendingInterviewQuestionProps) {
  const [randomIndex, setRandomIndex] = useState(0);
  const [usedIndexes, setUsedIndexes] = useState<number[]>([0]);

  useEffect(() => {
    const changeRandomIndex = () => {
      let newIdx;

      if (usedIndexes.length === INTERVIEW_TIP.length) {
        setUsedIndexes([]);
        newIdx = Math.floor(Math.random() * INTERVIEW_TIP.length);
      } else {
        do {
          newIdx = Math.floor(Math.random() * INTERVIEW_TIP.length);
        } while (usedIndexes.includes(newIdx));
      }

      setRandomIndex(newIdx);
      setUsedIndexes((prevUsedIndexes) => [...prevUsedIndexes, newIdx]);
    };

    const intervalId = setInterval(changeRandomIndex, 5000);

    return () => clearInterval(intervalId);
  }, [usedIndexes]);

  return (
    <div className="relative">
      <div className="flex flex-col">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="mb-3 h-[70px] w-full bg-gray-100" />
          ))}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-pre-wrap text-center">
        <h3 className="text-lg font-semibold text-blue-500">알고 계셨나요?</h3>
        <p className="text-2xl font-semibold text-gray-800">
          {INTERVIEW_TIP[randomIndex]}
        </p>
      </div>
    </div>
  );
}
