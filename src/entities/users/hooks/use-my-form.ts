import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  MyFormData,
  myFormValidation,
} from '@/config/validations/my-form-validation';
import { useUserStore } from '@/store/client';

import { useCurrentUser } from './use-current-user';
import { useUpdateNickname } from './use-update-nickname';

export const useMyForm = () => {
  const { update } = useCurrentUser();
  const { nickname, userId } = useUserStore((state) => ({
    nickname: state.data.nickname,
    userId: state.auth.userId,
  }));
  const { mutate } = useUpdateNickname();
  const form = useForm<MyFormData>({
    resolver: zodResolver(myFormValidation),
    defaultValues: {
      nickname: nickname as string,
    },
    mode: 'all',
  });

  const isSubmitting = form.formState.isSubmitting;
  const handleSubmit = form.handleSubmit(async (data) => {
    mutate(
      {
        nickname: data.nickname,
        userId: userId!,
      },
      {
        onSuccess: () => {
          update({ nickname: data.nickname });
          toast.success('요청이 성공적으로 처리되었습니다.');
        },
        onError: () => {
          toast.error('요청이 실패했습니다.');
        },
      },
    );
  });
  const isSameNickname = form.watch('nickname') === nickname;
  const isEnableSubmit =
    form.formState.isValid && !isSubmitting && !isSameNickname;

  return {
    form,
    isSubmitting,
    isEnableSubmit,
    handleSubmit,
  };
};
