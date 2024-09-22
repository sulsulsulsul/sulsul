import { Button } from '@/components/ui/button';
interface ButtonSectionProps {
  charCount: number;
  setModal: (state: boolean) => void;
}
export const ButtonSection = ({ charCount, setModal }: ButtonSectionProps) => {
  return (
    <div className="flex justify-between">
      <p className="text-sm">
        💌 BEST 답변으로 3회 이상 선정 시, 커피 쿠폰을 보내드려요!
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="default"
          className="h-[42px] w-[66px] border border-gray-300 bg-white text-gray-600"
          onClick={() => setModal(false)}
        >
          취소
        </Button>
        <Button
          size="sm"
          className="h-[42px] w-[101px]"
          variant="default"
          disabled={charCount >= 0 && charCount < 100}
        >
          답변 남기기
        </Button>
      </div>
    </div>
  );
};
