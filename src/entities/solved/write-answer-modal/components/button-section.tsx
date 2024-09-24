import { Button } from '@/components/ui/button';
import { useAnswerModalStore } from '@/store/answerModalStore';

interface ButtonSectionProp {
  charCount: number;
}
export const ButtonSection = ({ charCount }: ButtonSectionProp) => {
  const { setOpenCancelModal } = useAnswerModalStore();
  const handleClickCancelBtn = () => {
    setOpenCancelModal(true);
  };
  return (
    <div className="flex justify-between">
      <p className="text-sm">
        💌 BEST 답변으로 3회 이상 선정 시, 커피 쿠폰을 보내드려요!
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="default"
          className="h-[42px] w-[66px] border border-gray-300 bg-white text-gray-600 hover:bg-blue-500 hover:text-white"
          onClick={handleClickCancelBtn}
          type="button"
        >
          취소
        </Button>
        <Button
          size="sm"
          className="h-[42px] w-[101px]"
          variant="default"
          disabled={charCount >= 0 && charCount < 100}
          type="submit"
        >
          답변 남기기
        </Button>
      </div>
    </div>
  );
};
