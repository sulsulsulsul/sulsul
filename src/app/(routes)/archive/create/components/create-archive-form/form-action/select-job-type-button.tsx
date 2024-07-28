'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { getArchiveDetailAction } from '@/entities/archives/actions'
import { useCreateArchive } from '@/entities/archives/hooks'
import { useCreateQuestion } from '@/entities/questions/hooks/use-create-question'
import { useCurrentUser } from '@/entities/users/hooks'
import { useUpdateJob } from '@/entities/users/hooks/use-update-job'
import { cn } from '@/lib/utils'
import { usePendingStore } from '@/store/client'

import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form'

const JOB_TYPE: string[] = [
  '기획·전략',
  '마케팅·광고·MD',
  '디자인',
  '개발·데이터',
  '총무·법무·사무',
  '회계·세무·재무',
  '인사·노무·HR',
  '영업·판매·무역',
  '고객상담·TM',
  '금융·보험·투자',
  '서비스',
  '의료·제약·바이오',
  '문화·예술·공연',
  '교육',
  '건설·건축',
  '전기·전자·통신',
  '연구·R&D',
  '제조·생산',
  '공공·복지',
] as const

const wait = () => new Promise((resolve) => setTimeout(resolve, 0))

export const SelectJobTypeModal = () => {
  const [selectedType, setSelectedType] = useState('')
  const [open, setOpen] = useState(false) //모달 열림 여부
  const [newArchiveId, setNewArchiveId] = useState<number | null>(null)
  const { form } = useCreateArchiveFormContext()
  const { handleSubmit, getValues } = form

  const { user: session } = useCurrentUser()
  const userId = session.userId

  const router = useRouter()

  const { isPending, setIsPending } = usePendingStore()
  const { mutate: updateJobMutation } = useUpdateJob()
  const queryClient = useQueryClient()
  const { mutateAsync: createArchiveMutate } = useCreateArchive()
  const { mutateAsync: createQuestionMutate } = useCreateQuestion()

  const isFormValid = form.formState.isValid
  const isSubmitting = form.formState.isSubmitting

  const handleSelectedType = (value: string) => {
    setSelectedType(value)
  }

  const onSubmit = async () => {
    setIsPending(true)
    wait().then(() => setOpen(false))

    try {
      //jobId update
      const jobId = JOB_TYPE.indexOf(selectedType) + 1
      if (userId) updateJobMutation({ userId, jobId })

      //create archive
      const newArchiveId = await createArchiveMutate({
        title: getValues('title'),
        resume: getValues('resume'),
        companyName: getValues('companyName'),
      })

      setNewArchiveId(newArchiveId)

      //create questions ai
      await createQuestionMutate({ archiveId: newArchiveId })

      // polling function to check status
      const checkStatus = async () => {
        const updatedArchive = await queryClient.fetchQuery({
          queryKey: ['archive', newArchiveId],
          queryFn: () => getArchiveDetailAction(newArchiveId),
        })

        if (updatedArchive && updatedArchive.status === 'COMPLETE') {
          setIsPending(false)
          router.push(`/archive/${newArchiveId}`)
        } else {
          setTimeout(checkStatus, 2000)
        }
      }
      // start polling
      checkStatus()
    } catch (error) {
      alert('예측 중 오류가 발생했습니다. 다시 시도해주세요.')
      console.log(error)
      setIsPending(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isSubmitting || !isFormValid || isPending}
          type="button"
          className={cn(
            'grow border-gray-200 bg-gray-200 text-gray-500',
            isPending
              ? 'bg-gradient-to-r from-blue-500 to-[#4BF5CC] text-white'
              : isFormValid && 'bg-blue-500 text-white hover:bg-blue-600',
          )}
          variant={'outline'}
        >
          {isPending ? (
            <>
              <ActivateTwinkleIcon />
              <span>예상질문 예측 중</span>
            </>
          ) : isFormValid ? (
            <>
              <ActivateTwinkleIcon />
              <span>예상질문 예측하기</span>
            </>
          ) : (
            <>
              <NonActivateTwinkleIcon />
              <span>예상질문 예측하기</span>
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-auto max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <p className="text-sm text-blue-500">예상질문 정확도 3배 상승!</p>
            <h1 className="text-3xl font-bold">내 직무를 선택해주세요</h1>
          </AlertDialogTitle>
          <AlertDialogDescription className="mx-auto grid grid-cols-4 gap-3 py-5">
            {JOB_TYPE.map((type, idx) => (
              <Button
                key={idx}
                variant="outline"
                className={cn(
                  'w-[120px] rounded-sm border-gray-300 bg-gray-50 font-normal',
                  selectedType === type &&
                    'border-blue-500 bg-white text-blue-500',
                )}
                onClick={() => handleSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-auto">
          <AlertDialogCancel className="w-[180px]">취소하기</AlertDialogCancel>
          <AlertDialogAction
            disabled={selectedType === ''}
            className="w-[180px] bg-blue-500 text-white"
            onClick={handleSubmit(onSubmit)}
          >
            선택하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const NonActivateTwinkleIcon = () => {
  return (
    <Image
      src="/images/icons/icon-Twinkle.svg"
      width={24}
      height={24}
      alt="icon"
    />
  )
}

const ActivateTwinkleIcon = () => {
  return (
    <Image
      src="/images/icons/icon-Twinkle-activate.svg"
      width={24}
      height={24}
      alt="icon"
    />
  )
}
