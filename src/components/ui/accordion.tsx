'use client';

import * as React from 'react';
import Image from 'next/image';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useDeleteQuestionStore } from '@/store/deleteQuestions';
import { useEditQuestionStore } from '@/store/editingQuestions';

import checkDelete from '/public/images/icons/check-delete.svg';
import checkDeleteClicked from '/public/images/icons/check-delete-clicked.svg';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  questionId?: number;
  setClickedQuestions?: React.Dispatch<React.SetStateAction<number[]>>;
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ questionId, className, children, setClickedQuestions, ...props }, ref) => {
  const { isEditing } = useEditQuestionStore();
  const { deleteQuestions, setDeleteQuestions } = useDeleteQuestionStore();
  const isClicked = questionId && deleteQuestions.includes(questionId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (questionId && setClickedQuestions) {
      setClickedQuestions((prev: number[]) => {
        const isCurrentlyClicked = prev.includes(questionId);

        setDeleteQuestions((prevDeleteQuestions) => {
          if (isCurrentlyClicked) {
            return prevDeleteQuestions.filter((id) => id !== questionId);
          } else {
            if (!prevDeleteQuestions.includes(questionId)) {
              return [...prevDeleteQuestions, questionId];
            }
            return prevDeleteQuestions;
          }
        });

        if (isCurrentlyClicked) {
          return prev.filter((id) => id !== questionId);
        } else {
          return [...prev, questionId];
        }
      });
    }
  };

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        {isEditing ? (
          <Image
            src={isClicked ? checkDeleteClicked : checkDelete}
            alt="삭제체크버튼"
            width={24}
            height={24}
            onClick={handleClick}
          />
        ) : (
          <ChevronDown
            strokeWidth={2}
            className="shrink-0 text-gray-400 transition-transform duration-200"
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
