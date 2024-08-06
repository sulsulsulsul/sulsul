'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { AlertModal } from '@/components/shared/modal'
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
import { usePendingStore, useUserStore } from '@/store/client'
import { useCreateQuestionStore } from '@/store/createQuestions'
import { useCurrentArchiveIdStore } from '@/store/currentArchiveId'
import { useSampleStore } from '@/store/sampleQuestions'

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
  const [selectedType, setSelectedType] = useState('') //직무 타입
  const [open, setOpen] = useState(false) //모달 열림 여부
  const [failAlertOpen, setFailAlertOpen] = useState(false) //다시 시도 모달 열림 여부
  //자소서 버튼 내용
  const [buttonChildren, setButtonChildren] = useState(
    <>
      <ActivateTwinkleIcon />
      <span>예상질문 예측하기</span>
    </>,
  )

  const { form } = useCreateArchiveFormContext()
  const { handleSubmit, getValues } = form

  const { auth } = useUserStore()
  const userId = auth.userId

  const { isPending, setIsPending } = usePendingStore()
  const { isSampleClicked, isSampleWritten, setIsSampleWritten } =
    useSampleStore()
  const { isQuestionCreated, setIsQuestionCreated } = useCreateQuestionStore()
  const { setCurrentId } = useCurrentArchiveIdStore()

  const queryClient = useQueryClient()
  const { mutate: updateJobMutation } = useUpdateJob()
  const { mutateAsync: createArchiveMutate } = useCreateArchive()
  const { mutateAsync: createQuestionMutate } = useCreateQuestion()

  const isFormValid = form.formState.isValid
  const isSubmitting = form.formState.isSubmitting

  const handleSelectedType = (value: string) => {
    setSelectedType(value)
  }

  useEffect(() => {
    if (isQuestionCreated) {
      console.log('isQuestionCreated', isQuestionCreated)
      console.log('polling 끝')
    }
  }, [isQuestionCreated])

  const onSubmit = async () => {
    setIsPending(true)
    setFailAlertOpen(false)
    wait().then(() => setOpen(false))

    try {
      console.log('job update start')
      //jobId update
      const jobId = JOB_TYPE.indexOf(selectedType) + 1
      if (userId) updateJobMutation({ userId, jobId })
      console.log('job update완료', jobId)

      console.log('create archive start')
      //create archive
      const newArchiveId = await createArchiveMutate({
        title: getValues('title'),
        resume: getValues('resume'),
        companyName: getValues('companyName'),
      })

      setCurrentId(newArchiveId)
      console.log('create archive 완료', newArchiveId)

      console.log('create questions start')
      //create questions ai
      await createQuestionMutate({ archiveId: newArchiveId })

      // polling function to check status
      const checkStatus = async () => {
        const updatedArchive = await queryClient.fetchQuery({
          queryKey: ['archive', newArchiveId],
          queryFn: () => getArchiveDetailAction(newArchiveId),
        })
        console.log('updatedArchive', updatedArchive)

        if (updatedArchive && updatedArchive.status === 'COMPLETE') {
          setIsPending(false)
          setIsQuestionCreated(true)
        } else if (updatedArchive && updatedArchive.status === 'FAIL') {
          setFailAlertOpen((prev) => true)
        } else {
          setTimeout(async () => {
            // Invalidate the query to refetch data
            await queryClient.invalidateQueries({
              queryKey: ['archive', newArchiveId],
            })
            checkStatus()
          }, 5000)
        }
      }
      // start polling
      checkStatus()
    } catch (error) {
      setFailAlertOpen((prev) => true)
      console.log(error)
      setIsPending(false)
    }
  }

  const isButtonDisabled = (() => {
    if (isSampleWritten) return true
    if (isSampleClicked) return false
    if (isSubmitting || !isFormValid || isPending) return true
    return false
  })()

  const buttonClassName = (() => {
    if (isPending)
      return 'bg-gradient-to-r from-blue-500 to-[#4BF5CC] text-white'
    if (isSampleWritten || isQuestionCreated) return 'bg-blue-100 text-blue-500'
    if (isSampleClicked || isFormValid)
      return 'bg-blue-500 text-white hover:bg-blue-600'
    return ''
  })()

  useEffect(() => {
    if (isPending) {
      setButtonChildren(
        <>
          <ActivateTwinkleIcon />
          <span>예상질문 예측 중</span>
        </>,
      )
      return
    }
    if (
      !isSampleWritten &&
      (isSampleClicked || isFormValid) &&
      !isQuestionCreated
    ) {
      setButtonChildren(
        <>
          <ActivateTwinkleIcon />
          <span>예상질문 예측하기</span>
        </>,
      )
      return
    }
    if (isSampleWritten || isQuestionCreated) {
      setButtonChildren(
        <>
          <CompleteCheckIcon />
          <span>예상질문 예측완료</span>
        </>,
      )
      return
    }
    setButtonChildren(
      <>
        <NonActivateTwinkleIcon />
        <span>예상질문 예측하기</span>
      </>,
    )
  }, [
    isPending,
    isSampleWritten,
    isSampleClicked,
    isFormValid,
    isQuestionCreated,
  ])

  useEffect(() => {
    console.log('failAlertOpen', failAlertOpen)
  }, [failAlertOpen])

  return (
    <>
      <AlertDialog open={failAlertOpen} onOpenChange={setFailAlertOpen}>
        <AlertModal
          onClick={handleSubmit(onSubmit)}
          title="질문 예측 중 오류가 발생했어요"
          desc="다시 시도해 주시거나 문제가 지속될 경우 <br /> 관리자에게 문의해주세요."
          action="다시 시도"
        />
      </AlertDialog>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            disabled={isButtonDisabled}
            type="button"
            className={cn(
              'grow border-gray-200 bg-gray-200 text-gray-500',
              buttonClassName,
            )}
            variant="outline"
            onClick={() => {
              isSampleClicked && setIsSampleWritten()
              setFailAlertOpen((prev) => false)
            }}
          >
            {buttonChildren}
          </Button>
        </AlertDialogTrigger>
        {!isSampleClicked && !failAlertOpen && (
          <AlertDialogContent className="h-auto max-w-xl">
            <AlertDialogHeader>
              <AlertDialogTitle>
                <p className="text-sm text-blue-500">
                  예상질문 정확도 3배 상승!
                </p>
                <h1 className="text-3xl font-bold">내 직무를 선택해주세요</h1>
              </AlertDialogTitle>
              <AlertDialogDescription className="mx-auto grid grid-cols-4 gap-3 py-4">
                {JOB_TYPE.map((type, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className={cn(
                      'w-[120px] rounded-sm border-gray-300 bg-gray-50 font-normal',
                      selectedType === type &&
                        'border-blue-500 bg-white text-blue-500 hover:bg-white',
                    )}
                    onClick={() => handleSelectedType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mx-auto">
              <AlertDialogCancel className="w-[180px]">
                취소하기
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={selectedType === ''}
                className="w-[180px] bg-blue-500 text-white"
                onClick={handleSubmit(onSubmit)}
              >
                선택하기
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </>
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

const CompleteCheckIcon = () => {
  return (
    <Image
      src="/images/icons/icon-check.svg"
      width={24}
      height={24}
      alt="icon"
    />
  )
}
