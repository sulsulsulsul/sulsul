import { Button } from '@/components/ui/button';
import { useAnswerModalStore } from '@/store/answerModalStore';

interface ButtonSectionProp {
  charCount: number;
  disalbled: boolean;
}
export const ButtonSection = ({ charCount, disalbled }: ButtonSectionProp) => {
  const {
    setOpenCancelModal,
    setOpenAnswerModal,
    setIsEditModal,
    setIsOpenAllAnswerModal,
    setIsTogetherSection,
    setIsBestAnswerSection,
  } = useAnswerModalStore();
  const handleClickCancelBtn = () => {
    if (charCount > 0) {
      setOpenCancelModal(true);
    } else {
      setIsEditModal(false);
      setOpenAnswerModal(false);
      setIsOpenAllAnswerModal(false);
      setIsTogetherSection(false);
      setIsBestAnswerSection(false);
    }
  };
  return (
    <div className="flex justify-between mobile:flex-col mobile:gap-[38px]">
      <p className="text-sm font-semibold mobile:text-[13px] ">
        💌 BEST 답변으로 3회 이상 선정 시, 커피 쿠폰을 보내드려요
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="cancel"
          className="h-[42px] w-[66px] border border-gray-300 mobile:hidden"
          onClick={handleClickCancelBtn}
          type="button"
        >
          취소
        </Button>
        <Button
          size="sm"
          className="h-[42px] w-[101px] mobile:w-full"
          variant="default"
          disabled={(charCount >= 0 && charCount < 100) || disalbled}
          type="submit"
        >
          답변 남기기
        </Button>
      </div>
    </div>
  );
};
