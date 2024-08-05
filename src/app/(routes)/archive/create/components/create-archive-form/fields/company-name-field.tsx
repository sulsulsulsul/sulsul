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
interface CompanyNameFieldProps extends HTMLAttributes<HTMLDivElement> {}

export const CompanyNameField = ({
  className,
  ...props
}: CompanyNameFieldProps) => {
  const { form } = useCreateArchiveFormContext()
  const { isSampleClicked } = useSampleStore()
  const {status} = useCurrentUser()

  return (
    <div className={cn(className)} {...props}>
      {isSampleClicked ? (
        <div className="w-fit rounded-sm border-gray-100 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600">
          술술 주식회사
        </div>
      ) : (
        <FormField
          control={form.control}
          name="companyName"
          disabled={status==="unauthenticated"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="지원하는 기업"
                  className="rounded-sm border-gray-100 bg-gray-100"
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
