import { HTMLAttributes } from 'react'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCurrentUser } from '@/entities/users/hooks'
import { cn } from '@/lib/utils'
import { useSampleStore } from '@/store/sampleQuestions'

import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form'
interface TitleFieldProps extends HTMLAttributes<HTMLDivElement> {}

export const TitleField = ({ className, ...props }: TitleFieldProps) => {
  const { form } = useCreateArchiveFormContext()
  const { isSampleClicked } = useSampleStore()
  const {status} = useCurrentUser()

  return (
    <div className={cn(className)} {...props}>
      {isSampleClicked ? (
        <div className="text-2xl font-semibold text-gray-800">
          팀으로 함께 성과를 만들어낸 경험을 작성해주세요.
        </div>
      ) : (
        <FormField
          control={form.control}
          name="title"
          disabled={status==="unauthenticated"}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="자소서 제목을 입력해주세요"
                  className="px-0 text-xl font-semibold"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}
