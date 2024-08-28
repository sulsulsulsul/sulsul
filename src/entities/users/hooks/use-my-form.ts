import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { JOB_TYPE } from '@/app/(routes)/archive/create/components/create-archive-form/form-action/select-job-type-button';
import {
  MyFormData,
  myFormValidation,
} from '@/config/validations/my-form-validation';
import { useUserStore } from '@/store/client';

import { useUpdateJob } from './use-update-job';
import { useUpdateNickname } from './use-update-nickname';

export const useMyForm = () => {
  const queryClient = useQueryClient();
  const { data, setUserInfo } = useUserStore();
  const { nickname, userId } = data;
  const { update, data: session } = useSession();

  const { mutate: updateNicknameMutation } = useUpdateNickname();
  const { mutate: updateJobMutation } = useUpdateJob();
  const form = useForm<MyFormData>({
    resolver: zodResolver(myFormValidation),
    defaultValues: {
      nickname: nickname as string,
      job: JOB_TYPE[data.job.jobId - 2],
    },
    mode: 'all',
  });

  const isSubmitting = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const handleNicknameSubmit = form.handleSubmit(async () => {
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
  const isNicknameValid =
    !errors.nickname &&
    form.watch('nickname').length >= 2 &&
    form.watch('nickname').length <= 9;
  const isEnableSubmit = isNicknameValid && !isSubmitting && !isSameNickname;

  const handleJobSubmit = form.handleSubmit(async () => {
    updateJobMutation(
      {
        userId,
        jobId: JOB_TYPE.indexOf(form.watch('job')) + 2,
      },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries({ queryKey: ['job', userId] });

          await update({
            user: {
              ...session?.user,
              data: {
                ...session?.user.data,
                job: {
                  ...session?.user.data.job,
                  jobId: JOB_TYPE.indexOf(form.watch('job')) + 2,
                },
              },
            },
          });

          setUserInfo({
            data: {
              ...useUserStore.getState().data,
              job: {
                ...useUserStore.getState().data.job,
                jobId: JOB_TYPE.indexOf(form.watch('job')) + 2,
              },
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

  return {
    form,
    errors,
    isSubmitting,
    isSameNickname,
    isEnableSubmit,
    handleNicknameSubmit,
    handleJobSubmit,
  };
};
