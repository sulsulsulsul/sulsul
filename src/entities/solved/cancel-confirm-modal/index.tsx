import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useAnswerModalStore } from '@/store/answerModalStore';

export const CancelConfirmModal = () => {
  const { setOpenCancelModal, setOpenAnswerModal } = useAnswerModalStore();

  const handleClickExitBtn = () => {
    setOpenCancelModal();
    setOpenAnswerModal();
  };
  return (
    <div className="absolute left-0 top-0 z-[65] flex size-full items-center justify-center">
      <div className="z-[65] flex min-h-[284px] w-[428px] flex-col items-center justify-center gap-8 rounded-md border border-gray-100 bg-white p-[30px]">
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/images/icons/face-empty-yellow.svg"
            alt="취소 확인 아이콘"
            width={60}
            height={60}
          />
          <div className="flex flex-col items-center gap-[2px]">
            <p className="text-3xl font-bold">
              혹시 몰라요, 이 질문이 나올지도!
            </p>
            <p className="font-medium">끝까지 답변을 완성해볼까요?</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="h-[52px] w-[180px] border-none bg-gray-200 text-gray-500"
            variant="outline"
            onClick={handleClickExitBtn}
          >
            나가기
          </Button>
          <Button
            size="sm"
            className="h-[52px] w-[180px]"
            variant="default"
            onClick={setOpenCancelModal}
          >
            계속 작성하기
          </Button>
        </div>
      </div>
    </div>
  );
};
