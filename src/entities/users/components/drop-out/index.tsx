import { HTMLAttributes } from 'react';

import { AlertModal } from '@/components/shared/modal';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';

import { useWithdrawUser } from '../../hooks/use-withdraw-user';
interface DropOutProps extends HTMLAttributes<HTMLDivElement> {}

export const DropOut = ({ className, ...props }: DropOutProps) => {
  const { mutate: withdrawUserMutation } = useWithdrawUser();
  const { auth } = useUserStore();
  const { userId } = auth;
  return (
    <div className={cn(className)} {...props}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="px-0 font-medium text-gray-400 underline hover:opacity-80">
            탈퇴하기
          </button>
        </AlertDialogTrigger>
        <AlertModal
          onClick={() => withdrawUserMutation({ userId })}
          title="정말 탈퇴하시겠어요?"
          desc="탈퇴 시, 계정은 삭제되며 복구되지 않아요."
          action="탈퇴하기"
        />
      </AlertDialog>
    </div>
  );
};
