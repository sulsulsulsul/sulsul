import { HTMLAttributes } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCurrentUser } from '@/entities/users/hooks'
import { cn } from '@/lib/utils'

import { useMyForm } from '../../hooks/use-my-form'
interface MyFormProps extends HTMLAttributes<HTMLDivElement> {}

export const MyForm = ({ className, ...props }: MyFormProps) => {
  const { user } = useCurrentUser()
  const { form, isEnableSubmit, handleSubmit } = useMyForm()
  return (
    <div className={cn('flex flex-col items-center', className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-[122px] text-nowrap text-lg font-medium text-gray-500">
                  닉네임
                </FormLabel>
                <FormControl>
                  <div className="relative flex flex-col">
                    <Input
                      autoComplete="off"
                      className="h-[58px] w-[449px] rounded-sm bg-transparent"
                      {...field}
                    />
                    <FormMessage className="absolute bottom-0 translate-y-6" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={!isEnableSubmit} type="submit">
            수정하기
          </Button>
        </form>
      </Form>
      <div className="ml-[112px] mt-[60px] flex w-full items-center justify-start gap-1">
        <Label className="w-[122px] text-nowrap text-lg font-medium text-gray-500">
          로그인 계정
        </Label>
        <div className="relative">
          <Input
            className="h-[58px] w-[449px] rounded-sm bg-transparent text-gray-500"
            readOnly
            value={user?.email as string}
          />
          <Image
            className="absolute right-5 top-1/2 -translate-y-1/2"
            alt=""
            height={24}
            src="/images/icons/icon-check-circle.svg"
            width={24}
          />
        </div>
      </div>
    </div>
  )
}
