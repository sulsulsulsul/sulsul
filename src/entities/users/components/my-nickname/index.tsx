import { HTMLAttributes } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';

import { useMyForm } from '../../hooks/use-my-form';
interface MyFormProps extends HTMLAttributes<HTMLDivElement> {}

export const MyNickname = ({ className, ...props }: MyFormProps) => {
  const { nickname } = useUserStore((state) => ({
    nickname: state.data.nickname,
  }));
  const { form, isEnableSubmit, handleNicknameSubmit, errors } = useMyForm();
  const isError = !!errors.nickname;

  return (
    <div className={cn('flex flex-col items-center', className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={handleNicknameSubmit}
          className="flex items-center gap-12"
        >
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => {
              const isNicknameChanged =
                field.value !== (nickname as string) &&
                field.value.length >= 2 &&
                field.value.length <= 9;

              return (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-[122px] text-nowrap text-lg font-medium text-gray-500">
                    닉네임
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex flex-col">
                      <input
                        placeholder="2~9자 사이로 입력해주세요."
                        autoComplete="off"
                        className={`h-[58px] w-[449px] rounded-xl border border-gray-200 bg-transparent px-5 py-[10px] ${isError ? `outline-red-500` : `outline-blue-500`}`}
                        {...field}
                      />
                      {isError ? (
                        <FormMessage
                          type="error"
                          className="absolute bottom-0 translate-x-4 translate-y-6"
                        />
                      ) : isNicknameChanged ? (
                        <FormMessage
                          className="absolute bottom-0 translate-x-4 translate-y-6"
                          type="success"
                        >
                          여전히 멋진 닉네임이네요 :&#41;
                        </FormMessage>
                      ) : null}
                    </div>
                  </FormControl>
                  <Button disabled={!isEnableSubmit} type="submit">
                    수정하기
                  </Button>
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </div>
  );
};
