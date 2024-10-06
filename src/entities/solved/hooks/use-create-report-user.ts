import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createReportUserAction } from '../actions/create-report-user-action';

interface CreateReportUserProps {
  answerId: number;
  accessToken: string;
  setOpenReportModal: (isOpen: boolean) => void;
}
export const useCreateReportUser = ({
  answerId,
  accessToken,
  setOpenReportModal,
}: CreateReportUserProps) => {
  //   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return createReportUserAction({ answerId, accessToken });
    },
    onError: () => {
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      toast.success('신고처리가 완료되었습니다.');

      setOpenReportModal(false);
    },
  });
};
