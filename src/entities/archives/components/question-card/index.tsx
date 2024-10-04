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
import { useFocusedQuestionCard } from '@/store/practiceStore';

import { CardBody } from './card-body';
import { CardHeader } from './card-header';

interface QuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  data: ArchiveQuestionItem;
  archiveId?: number;
  isClicked: boolean;
  setClickedQuestions: React.Dispatch<React.SetStateAction<number[]>>;
  type: string;
}

export const QuestionCard = ({
  className,
  data,
  archiveId,
  isClicked,
  setClickedQuestions,
  type = '',
  ...props
}: QuestionCardProps) => {
  const { focused } = useFocusedQuestionCard();
  const { content, keywords, isAnswered, questionId } = data;
  const [isAccodionOpen, setIsAccodionOpen] = useState(false);
  const defaultFocused = focused === questionId ? 'item-1' : '';
  return (
    <div className={cn(className)} {...props}>
      <div className="rounded-md bg-white pl-4 pr-7">
        <Accordion
          type="single"
          defaultValue={defaultFocused}
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger
              questionId={questionId}
              setClickedQuestions={setClickedQuestions}
              onClick={() => setIsAccodionOpen((prev) => !prev)}
            >
              <CardHeader
                className="flex flex-col justify-center py-2"
                content={content}
                questionId={questionId}
                keywords={keywords}
                isAnswered={isAnswered}
                isAccodionOpen={isAccodionOpen}
              />
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <CardBody
                className="pb-5 pl-4"
                question={data}
                questionId={questionId}
                archiveId={archiveId!}
                isAnswered={isAnswered}
                type={type}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
