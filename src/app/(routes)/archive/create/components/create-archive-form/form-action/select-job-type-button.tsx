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
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form'
import { useState } from 'react'

export const SelectJobTypeModal = () => {
  const [selectedType, setSelectedType] = useState('')
  const { form } = useCreateArchiveFormContext()

  const isFormValid = form.formState.isValid
  const isSubmitting = form.formState.isSubmitting

  const JOB_TYPE = [
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
  ]

  const handleSelectedType = (value: string) => {
    setSelectedType(value)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isSubmitting || !isFormValid}
          type="button"
          className={cn(
            'grow border-gray-200 bg-gray-200 text-gray-500',
            isFormValid ? 'bg-blue-500 text-white hover:bg-blue-600' : '',
          )}
          variant={'outline'}
        >
          {/* Form Valid 상태에 따른 Icon 변화 */}
          {isFormValid ? <ActivateTwinkleIcon /> : <NonActivateTwinkleIcon />}
          예상질문 예측하기
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
                  selectedType === type
                    ? 'border-blue-500 bg-white text-blue-500'
                    : '',
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
          <AlertDialogAction className="w-[180px] bg-blue-500 text-white">
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
