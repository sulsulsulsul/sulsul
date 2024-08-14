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
    console.log('nickname', form.watch('nickname'));
    updateNicknameMutation(
      {
        nickname: form.watch('nickname'),
        userId: userId!,
      },
      {
        onSuccess: () => {
          update({ nickname: form.watch('nickname') });
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
