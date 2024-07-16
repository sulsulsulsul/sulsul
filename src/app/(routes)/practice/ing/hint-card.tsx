import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { HTMLAttributes } from 'react'
interface HintCardProps extends HTMLAttributes<HTMLDivElement> {
  showHint: boolean
  setShowHint: (showHint: boolean) => void
}

export const HintCard = ({
  className,
  showHint,
  setShowHint,
  ...props
}: HintCardProps) => {
  return (
    <div
      className={cn(
        'relative flex size-full flex-col px-[42px] pt-[60px] pb-[50px]',
        className,
      )}
      {...props}
    >
      <div className="flex h-[53px] w-full items-center gap-1 overflow-scroll">
        {Array.from({ length: 10 }).map((_, index) => (
          <Badge key={index} variant={'keyword'} className="min-w-fit">
            키워드 {index + 1}
          </Badge>
        ))}
      </div>
      <div className="mt-3 grow overflow-scroll text-lg font-medium">
        MVP 테스트를 진행하면서 어려웠던 점은 코로나 시기에 직접 현장에 나가서
        시민들의 의견을 수집하는 일이었습니다. 처음에는 시민들에게 접근하는
        과정에서 약간의 어색함을 느꼈지만 친근한 대화를 나누는 자세로 설문
        조사의 목적과 중요성을 명확하게 전달하고, 간결하고 효율적인 설문지를
        사용하여 참여를 유도했습니다. 이러한 노력 덕분에 목표 이상의 참여율을
        달성할 수 있있고, 익숙하지 않은 상황에서도 안정적으로 대응할 수 있는
        유연함을 얻을 수 있었습니다.
      </div>
      <div
        onClick={() => setShowHint(!showHint)}
        className="absolute bottom-[18px] left-1/2 flex w-full -translate-x-1/2 cursor-pointer items-center justify-center gap-1"
      >
        <span className="text-gray-500">힌트</span>
        <ChevronDown
          className={cn('text-gray-400 transition-transform', {
            'transform -rotate-180': showHint,
          })}
        />
      </div>
    </div>
  )
}
