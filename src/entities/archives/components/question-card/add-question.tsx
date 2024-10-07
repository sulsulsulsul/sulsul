import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

import { useCreateOwnQuestion } from '@/entities/questions/hooks/use-create-own-question';

import addQs from '/public/images/icons/icon-add-white.svg';

interface AddQuestionProps {
  archiveId: number;
}

export const AddQuestion = ({ archiveId }: AddQuestionProps) => {
  const { mutate: createOwnQuestionMutation } = useCreateOwnQuestion();
  const queryClient = useQueryClient();

  const handleClickAddQuestion = () => {
    createOwnQuestionMutation(
      { archiveId, question: '' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['archive', archiveId],
          });
        },
      },
    );
  };

  return (
    <div
      role="button"
      className="group fixed bottom-10 right-10 flex cursor-pointer gap-1 rounded-full bg-blue-500 p-[14px] transition-all duration-300 ease-in-out hover:rounded-[30px] hover:pl-4 hover:pr-6"
      onClick={handleClickAddQuestion}
    >
      <Image
        src={addQs}
        alt="질문추가하기아이콘"
        width={24}
        height={24}
        className="transition-transform duration-300 ease-in-out"
      />
      <p className=" hidden max-w-0 text-lg font-semibold text-white transition-all duration-300 ease-in-out group-hover:block group-hover:max-w-[200px]">
        직접 추가하기
      </p>
    </div>
  );
};
