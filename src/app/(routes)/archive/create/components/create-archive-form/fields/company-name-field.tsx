import { HTMLAttributes } from 'react'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form'
interface CompanyNameFieldProps extends HTMLAttributes<HTMLDivElement> {}

export const CompanyNameField = ({
  className,
  ...props
}: CompanyNameFieldProps) => {
  const { form } = useCreateArchiveFormContext()
  return (
    <div className={cn(className)} {...props}>
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input placeholder="회사명을 입력해주세요." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
