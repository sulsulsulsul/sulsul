import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
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
    </div>
  )
}
