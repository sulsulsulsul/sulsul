import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  MyFormData,
  myFormValidation,
} from '@/config/validations/my-form-validation';
import { useUserStore } from '@/store/client';

import { useUpdateNickname } from './use-update-nickname';

export const useMyForm = () => {
  const queryClient = useQueryClient();
  const { data, setUserInfo } = useUserStore();
  const { nickname, userId } = data;
  const { update, data: session } = useSession();

  const { mutate: updateNicknameMutation } = useUpdateNickname();
  const form = useForm<MyFormData>({
    resolver: zodResolver(myFormValidation),
    defaultValues: {
      nickname: nickname as string,
    },
    mode: 'all',
  });

  const isSubmitting = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const handleSubmit = form.handleSubmit(async () => {
    updateNicknameMutation(
      {
        nickname: form.watch('nickname'),
        userId: userId!,
      },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries({ queryKey: ['nickname', userId] });

          await update({
            user: {
              ...session?.user,
              data: {
                ...session?.user.data,
                nickname: form.watch('nickname'),
              },
            },
          });

          setUserInfo({
            data: {
              ...useUserStore.getState().data,
              nickname: form.watch('nickname'),
            },
          });

          toast.success('수정되었어요.');
        },
        onError: () => {
          toast.error('오류가 발생했어요. 잠시 후 다시 시도해주세요.');
        },
      },
    );
  });
  const isSameNickname = form.watch('nickname') === nickname;
  const isEnableSubmit =
    form.formState.isValid && !isSubmitting && !isSameNickname;

  return {
    form,
    errors,
    isSubmitting,
    isSameNickname,
    isEnableSubmit,
    handleSubmit,
  };
};
