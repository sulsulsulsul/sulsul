import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form'
interface FormActionProps extends HTMLAttributes<HTMLDivElement> {}

export const FormAction = ({ className, ...props }: FormActionProps) => {
  const { form } = useCreateArchiveFormContext()

  const isFormValid = form.formState.isValid
  const isSubmitting = form.formState.isSubmitting
  return (
    <div className={cn(className)} {...props}>
      <div className="flex gap-2">
        <Button className="basis-[117px] text-gray-600" variant={'outline'}>
          <Image
            src="/images/icons/icon-redo.svg"
            width={24}
            height={24}
            alt="icon"
          />
          초기화
        </Button>
        <Button
          disabled={isSubmitting}
          type="submit"
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
      </div>
    </div>
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
