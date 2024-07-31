'use client'

import { HTMLAttributes, useState } from 'react'
import { HighlightMenu } from 'react-highlight-menu'
import Highlighter from 'react-highlight-words'
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { useCreateKeyword } from '@/entities/keywords/hooks/use-create-keyword'
import { ArchiveKeyword } from '@/entities/types'
import { cn } from '@/lib/utils'
interface QuestionAnswerProps extends HTMLAttributes<HTMLDivElement> {
  answer: string
  keywords: ArchiveKeyword[]
  questionId: number
}

export const QuestionAnswer = ({
  className,
  answer,
  keywords,
  questionId,
  ...props
}: QuestionAnswerProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const queryClient = useQueryClient()
  const { mutate: createKeywordMutation } = useCreateKeyword()

  return (
    <div
      className={cn('relative border rounded-base p-4', className)}
      {...props}
    >
      <HighlightMenu
        target=".user-answer"
        allowedPlacements={['top', 'bottom']}
        styles={{
          boxShadow: '0px 4px 24px rgba(26, 33, 81, 0.24)',
          borderRadius: '10px',
          border: 'none',
        }}
        menu={({ selectedText = '', setClipboard, setMenuOpen }) => (
          <div>
            <Button
              className="gap-2 border-0 px-2 py-1 hover:bg-white"
              variant={'ghost'}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                setClipboard(selectedText, () => {
                  createKeywordMutation(
                    { questionId, content: selectedText },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ['keywords', questionId],
                        })
                      },
                    },
                  )
                })
                setMenuOpen(false)
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
                alt=""
                color="#2563eb"
              />
              <span className="text-base font-medium text-gray-600 hover:text-blue-600">
                키워드 노트
              </span>
            </Button>
          </div>
        )}
      />

      <div className="max-h-[220px] resize-none overflow-y-scroll border-none">
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <div className="user-answer">
          <Highlighter
            highlightClassName="bg-green-300"
            searchWords={keywords.map((keyword) => keyword.content)}
            autoEscape={true}
            textToHighlight={answer}
          />
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <div className="flex flex-col gap-px text-2xs">
          <div className="absolute bottom-4">
            <span className="text-gray-600">{answer.length ?? 0}</span>
            <span className="text-gray-400">/500자</span>
          </div>
        </div>
        <div className="flex gap-1">
          <Button size={'sm'}>수정하기</Button>
        </div>
      </div>
    </div>
  )
}
