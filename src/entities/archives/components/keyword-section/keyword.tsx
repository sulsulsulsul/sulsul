import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';

import { useDeleteKeyword } from '@/entities/keywords/hooks/use-delete-keyword';
import { KeywordDTO } from '@/entities/types';

interface KeywordProps {
  keywords?: KeywordDTO[];
  isHeader?: boolean;
  questionId?: number;
}

export const KeywordSet = ({
  keywords = [],
  isHeader = false,
  questionId = 0,
}: KeywordProps) => {
  const { mutate: deleteKeywordMutation } = useDeleteKeyword();
  const queryClient = useQueryClient();

  const onDeleteKeyword = (keywordId: number) => {
    {
      deleteKeywordMutation(
        { questionId, keywordId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['keywords', questionId],
            });
          },
        },
      );
    }
  };
  return keywords.map((keyword) => (
    <div
      key={keyword.keywordId}
      className="flex items-center rounded-sm border border-green-500 bg-green-100 px-4 py-2 text-green-900"
    >
      <span className="text-base font-medium">{keyword.content}</span>
      {!isHeader && (
        <span
          onClick={() => onDeleteKeyword(keyword.keywordId)}
          className="cursor-pointer"
        >
          <X size={16} strokeWidth={1.2} className="ml-1 -translate-y-px" />
        </span>
      )}
    </div>
  ));
};

KeywordSet.displayName = 'KeywordSet';
