'use client'

import { cn } from '@/lib/utils'
import { HTMLAttributes, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ArchiveQuestionItem } from '@/entities/types'
import { mockArchiveFeedback } from '../../fixtures'
import { CardBody } from './card-body'
import { CardHeader } from './card-header'

interface QuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  data: ArchiveQuestionItem
}

export const QuestionCard = ({
  className,
  data,
  ...props
}: QuestionCardProps) => {
  const [isAccodionOpen, setIsAccodionOpen] = useState(false)

  const { content, keywords, isAnswered } = data
  // TODO: useFeedback 구현

  return (
    <div className={cn(className)} {...props}>
      <div className="rounded-md bg-white pl-4 pr-7">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger
              onClick={() => setIsAccodionOpen((prev) => !prev)}
            >
              <CardHeader
                content={content}
                keywords={keywords}
                isAnswered={isAnswered}
                isAccodionOpen={isAccodionOpen}
              />
            </AccordionTrigger>
            <AccordionContent className="pl-[20px] pt-2">
              <CardBody
                // TODO: useFeedback 결과값 전달
                feedback={mockArchiveFeedback()}
                className="pb-5"
                question={data}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
