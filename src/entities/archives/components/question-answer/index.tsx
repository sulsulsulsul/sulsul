'use client'

import { Button } from '@/components/ui/button'
import { ArchiveKeyword } from '@/entities/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import { HighlightMenu } from 'react-highlight-menu'
import Highlighter from 'react-highlight-words'
interface QuestionAnswerProps extends HTMLAttributes<HTMLDivElement> {
  answer: string
  onCreateKeywordNote: (keyword: string) => void
  keywords: ArchiveKeyword[]
}

export const QuestionAnswer = ({
  className,
  answer,
  keywords,
  onCreateKeywordNote,
  ...props
}: QuestionAnswerProps) => {
  return (
    <div
      className={cn('relative border rounded-base p-4', className)}
      {...props}
    >
      <HighlightMenu
        target=".user-answer"
        allowedPlacements={['top', 'bottom']}
        menu={({ selectedText = '', setClipboard, setMenuOpen }) => (
          <>
            <Button
              className="gap-2 rounded-base px-2 py-1"
              variant={'ghost'}
              onClick={() => {
                onCreateKeywordNote(selectedText)
              }}
            >
              <Image
                src="/images/icons/icon-keyword.svg"
                width={24}
                height={24}
                alt=""
              />
              <span className="text-base font-medium">키워드 노트</span>
            </Button>
          </>
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
        <div className="flex flex-col gap-px">
          <div>
            <span>{answer.length ?? 0}</span>
            <span className="text-gray-500">/500자</span>
          </div>
        </div>
        <Button size={'sm'}>수정하기</Button>
      </div>
    </div>
  )
}
