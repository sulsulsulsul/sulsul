'use client'

import { HTMLAttributes } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { APP_ROUTES } from '@/config/constants/app-routes'
import { ArchiveFeedbackStatus } from '@/entities/types'
import { cn } from '@/lib/utils'
interface ActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
  status: ArchiveFeedbackStatus
}

export const ActionButtons = ({
  className,
  status,
  ...props
}: ActionButtonsProps) => {
  const router = useRouter()
  const handleNew = () => {
    router.push(APP_ROUTES.createArchive())
  }

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <Button
        onClick={handleNew}
        className="gap-2 px-8 text-gray-600"
        variant={'outline'}
      >
        <Image
          src="/images/icons/icon-redo.svg"
          width={24}
          height={24}
          alt="icon"
        />
        새로 작성
      </Button>
      {status === 'COMPLETE' && (
        <Button
          type="button"
          className={cn(
            'bg-blue-100 gap-2 text-blue-500 hover:bg-blue-100 cursor-default w-full',
          )}
          variant={'outline'}
        >
          <Image
            src="/images/icons/icon-check.svg"
            width={24}
            height={24}
            alt="icon"
          />
          <span>예상질문 예측 완료</span>
        </Button>
      )}
      {status !== 'COMPLETE' && (
        <Button
          type="button"
          className={cn(
            'bg-gradient-to-br from-[#576DFC] to-[#4BF5CC] gap-2 text-white hover:bg-blue-100 cursor-default w-full',
          )}
          variant={'outline'}
        >
          <Image
            src="/images/icons/icon-Twinkle-activate.svg"
            width={24}
            height={24}
            alt="icon"
          />
          <span>예상질문 예측 완료</span>
        </Button>
      )}
    </div>
  )
}
// bg-gradient-to-r from-[#576DFC] to-[#BEB6FF]
