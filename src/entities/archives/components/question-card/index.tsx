'use client';

import { HTMLAttributes, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArchiveQuestionItem } from '@/entities/types';
import { cn } from '@/lib/utils';

import { CardBody } from './card-body';
import { CardHeader } from './card-header';

interface QuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  data: ArchiveQuestionItem;
  archiveId?: number;
}

export const QuestionCard = ({
  className,
  data,
  archiveId,
  ...props
}: QuestionCardProps) => {
  const [isAccodionOpen, setIsAccodionOpen] = useState(false);

  const { content, keywords, isAnswered, questionId } = data;

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
                questionId={questionId}
                keywords={keywords}
                isAnswered={isAnswered}
                isAccodionOpen={isAccodionOpen}
              />
            </AccordionTrigger>
            <AccordionContent className="pl-[20px] pt-2">
              <CardBody
                className="pb-5"
                question={data}
                questionId={questionId}
                archiveId={archiveId!}
                isAnswered={isAnswered}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
