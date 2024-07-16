import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { Button } from '../ui/button'
interface DashboardQuestionCardProps extends HTMLAttributes<HTMLDivElement> {}

export const DashboardQuestionCard = ({
  className,
  ...props
}: DashboardQuestionCardProps) => {
  return (
    <div className={cn(className)} {...props}>
      <div className="flex items-center justify-between rounded-md bg-white p-6">
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">
            MVP 테스트를 진행하는 과정에서 여려웠던 점은 무엇이었나요?
          </h4>
          <div className="flex items-center gap-[6px] text-gray-500">
            <div className="w-fit rounded-sm bg-gray-100 px-[7px] py-[10px] text-2xs font-medium ">
              작성한 기업명
            </div>
            <p>팀으로 함께 성과를 만들어낸 경험을 작성해주세요.</p>
          </div>
        </div>

        <Button size={'sm'} variant={'green'}>
          다시 연습
        </Button>
      </div>
    </div>
  )
}
