import { cn } from '@/lib/utils';

interface ModalHeaderProp {
  charCount: number;
}

export const ModalHeader = ({ charCount }: ModalHeaderProp) => {
  const className = charCount ? 'text-blue-500' : 'text-gray-300';
  return (
    <div className="flex items-center justify-between">
      <div className="text-3xl font-bold text-gray-900">
        Q. 상사와 의견이 다를 때 어떻게 대처하실 건가요?
      </div>
      <button className={cn('font-medium text-[15px]', className)}>
        임시저장
      </button>
    </div>
  );
};
