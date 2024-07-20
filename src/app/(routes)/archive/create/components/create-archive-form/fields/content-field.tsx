import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form'
interface ContentFieldProps extends HTMLAttributes<HTMLDivElement> {}

export const ContentField = ({ className, ...props }: ContentFieldProps) => {
  const { form } = useCreateArchiveFormContext()

  return (
    <div className={cn(className)} {...props}>
      <FormField
        control={form.control}
        name="resume"
        render={({ field }) => (
          <FormItem className="size-full">
            <FormControl>
              <Textarea
                maxLength={1999}
                className="min-h-[400px] w-full border-0 px-0"
                placeholder="300자 이상 2000자 이내의 내용을 입력해주세요."
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
