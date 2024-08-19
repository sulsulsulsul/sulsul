import Image from 'next/image';

import { useCreateOwnQuestion } from '@/entities/questions/hooks/use-create-own-question';

import addQs from '/public/images/icons/add-questions.svg';

interface AddQuestionProps {
  archiveId: number;
}

export const AddQuestion = ({ archiveId }: AddQuestionProps) => {
  const { mutate: createOwnQuestionMutation } = useCreateOwnQuestion();

  return (
    <Image
      src={addQs}
      alt="질문추가하기아이콘"
      width={100}
      height={100}
      className="fixed bottom-10 right-10 cursor-pointer"
      onClick={() => {
        createOwnQuestionMutation({ archiveId, question: '' });
      }}
    />
  );
};
