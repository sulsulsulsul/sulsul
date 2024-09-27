import Image from 'next/image';

import { Popover } from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const TogetherSolvedHeader = () => {
  return (
    <>
      <div className="relative flex">
        <div className="flex flex-1 gap-1">
          <Image
            src="/images/icons/etc-speech.svg"
            width={32}
            height={32}
            alt="icon"
          />
          <h2 className="text-[20px] font-bold">다같이 면접기출</h2>
        </div>
        <Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  src="/images/icons/icon-information circle.svg"
                  className="absolute bottom-0 right-4"
                  width={24}
                  height={24}
                  alt="icon"
                />
              </TooltipTrigger>
              <TooltipContent className="fixed left-[-212px] top-[35px] flex h-[116px] w-[233px] flex-col items-center justify-center overflow-visible rounded-[10px] border-none bg-gray-700 pr-0 text-white">
                <>
                  <Image
                    className="absolute left-52 top-[-10px] rotate-90"
                    src="/images/polygonInfo.svg"
                    alt="polygonInfo"
                    width={8}
                    height={14}
                  />
                  <ul className="flex w-[187px] list-outside list-disc flex-col justify-center gap-2">
                    <li className="text-sm">
                      다른 지원자들과 함께 매주 하나의 동일한 기출문제를 풀어요.
                    </li>
                    <li className="w-full text-sm">
                      내 답변을 남긴 후 다른 지원자들의 답변을 볼 수 있어요.
                    </li>
                  </ul>
                </>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Popover>
      </div>
    </>
  );
};
