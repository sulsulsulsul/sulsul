import { useState } from 'react';
import { MenuArgs } from 'react-highlight-menu';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { useCreateKeyword } from '@/entities/keywords/hooks/use-create-keyword';

interface KeywordNoteProps extends MenuArgs {
  questionId: number;
  type: string;
}
export const KeywordNote = ({
  selectedText = '',
  setClipboard,
  setMenuOpen,
  questionId,
  type = '',
}: KeywordNoteProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: createKeywordMutation } = useCreateKeyword();

  return (
    <div>
      <Button
        className="gap-2 border-0 px-2 py-1 hover:bg-white"
        variant="ghost"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          setClipboard(selectedText, () => {
            createKeywordMutation(
              { questionId, content: selectedText, type },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ['keywords', questionId],
                  });
                  setMenuOpen(false);
                },
              },
            );
          });
        }}
      >
        <Image
          src={
            isHovered
              ? '/images/icons/icon-keyword-blue.svg'
              : '/images/icons/icon-keyword.svg'
          }
          width={24}
          height={24}
          alt="책갈피 아이콘"
        />
        <span className="text-base font-medium text-gray-600 hover:text-blue-600">
          키워드 노트
        </span>
      </Button>
    </div>
  );
};
