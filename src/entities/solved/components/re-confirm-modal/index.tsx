import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { AnswerListData } from '@/entities/types/interview';
import { formatDate } from '@/shared/helpers/date-helpers';
import { useAnswerModalStore } from '@/store/answerModalStore';
import { useUserStore } from '@/store/client';

import { useDeleteAnswer } from '../../hooks/use-delete-answer';
import { useInterview } from '../../hooks/use-get-interview';

import warningIcon from '/public/images/icons/alert.svg';
import faceIcon from '/public/images/icons/face-empty-yellow.svg';

interface ConfirmModalProps {
  type: 'exit' | 'delete';
  myWriteAnswerData?: AnswerListData;
}
interface ModalContent {
  icon: string;
  title: string;
  detail: string;
  leftButton: string;
  rightButton: string;
}

const MODAL_CONTENT: Record<'exit' | 'delete', ModalContent> = {
  exit: {
    icon: faceIcon,
    title: '혹시 몰라요, 이 질문이 나올지도!',
    detail: '끝까지 답변을 완성해볼까요?',
    leftButton: '나기기',
    rightButton: '계속 작성하기',
  },
  delete: {
    icon: warningIcon,
    title: '답변을 삭제하시겠어요?',
    detail: '삭제한 답변은 다시 복구할 수 없어요.',
    leftButton: '취소하기',
    rightButton: '삭제하기',
  },
};

export const ReConfirmModal = ({
  type,
  myWriteAnswerData,
}: ConfirmModalProps) => {
  const { auth } = useUserStore();
  const { accessToken, userId } = auth;
  const { icon, title, detail, leftButton, rightButton } = MODAL_CONTENT[type];
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });
  const { data: currentData, refetch } = useInterview(pivotDate);

  const { setOpenCancelModal, setOpenAnswerModal, setOpenDeleteModal } =
    useAnswerModalStore();

  const { mutate: deleteAnswerMutation, isSuccess } = useDeleteAnswer({
    interviewId: currentData?.weeklyInterviewId || 0,
    answerId: myWriteAnswerData?.weeklyInterviewAnswerId || 0,
    accessToken,
    userId,
    setOpenDeleteModal,
  });

  const handleClickLeftBtn = () => {
    if (type === 'exit') {
      setOpenCancelModal(false);
      setOpenAnswerModal(false);
    } else {
      setOpenDeleteModal(false);
    }
  };

  const handleClickRightBtn = () => {
    if (type === 'exit') {
      setOpenCancelModal(false);
    } else {
      deleteAnswerMutation();
    }
  };
  return (
    <div className="z-[70] flex min-h-[284px] w-[428px] flex-col items-center justify-center gap-8 rounded-md border border-gray-100 bg-white p-[30px] mobile:w-[350px]">
      <div className="flex flex-col items-center gap-6">
        <Image src={icon} alt="재확인 아이콘" width={60} height={60} />
        <div className="flex flex-col items-center gap-[2px]">
          <p className="text-3xl font-bold">{title}</p>
          <p className="font-medium">{detail}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          className="h-[52px] w-[180px] border-none bg-gray-200 text-gray-500 mobile:w-32"
          variant="outline"
          onClick={handleClickLeftBtn}
        >
          {leftButton}
        </Button>
        <Button
          size="sm"
          className="h-[52px] w-[180px] mobile:w-32"
          variant="default"
          onClick={handleClickRightBtn}
        >
          {rightButton}
        </Button>
      </div>
    </div>
  );
};
