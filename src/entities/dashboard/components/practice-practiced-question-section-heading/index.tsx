import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
interface PracticePracticedQuestionSectionHeadingProps
  extends HTMLAttributes<HTMLDivElement> {}

export const PracticePracticedQuestionSectionHeading = ({
  className,
  ...props
}: PracticePracticedQuestionSectionHeadingProps) => {
  return (
    <div className={cn('flex gap-1.5 items-center', className)} {...props}>
      <Image
        className="translate-y-[-2px]"
        alt=""
        width={32}
        height={32}
        src={'/images/icons/etc-speech.svg'}
      />
      <h3 className="text-4xl font-bold text-gray-800">연습한 면접질문</h3>
    </div>
  )
}
