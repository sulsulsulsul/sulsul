import { HTMLAttributes, useEffect, useState } from 'react';
import _ from 'lodash-es';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { SearchQuestionContent } from '@/entities/questions/types';
import { cn } from '@/lib/utils';

interface PracticedQuestionCarouselProps
  extends HTMLAttributes<HTMLDivElement> {
  questions: SearchQuestionContent[];
}

const PracticedQuestionCarousel = ({
  className,
  questions,
}: PracticedQuestionCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedSnap, setSelectedSnap] = useState(0);
  const formattedQuestions = _.chunk(questions, 3);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setSelectedSnap(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between rounded-md border bg-white px-5 pt-1 shadow-base',
        className,
      )}
    >
      <Carousel className="w-full" opts={{ align: 'start' }} setApi={setApi}>
        <CarouselContent>
          {formattedQuestions.slice(0, 4).map((questions, index) => (
            <CarouselItem className="divide-y divide-slate-200" key={index}>
              {questions.map((question, index) => (
                <div
                  className="w-full pt-5"
                  key={`${question.archive.archiveId}_${index}`}
                >
                  <h4 className="truncate text-lg font-semibold">
                    {question.archive.title}
                  </h4>
                  <div className="flex items-center gap-[6px] text-gray-500">
                    <span className="w-fit shrink-0 rounded-sm bg-gray-100 px-[7px] py-[10px] text-2xs font-medium">
                      {question.archive.companyName}
                    </span>
                    <p className="truncate text-sm font-medium">
                      {question.content}
                    </p>
                  </div>
                  <Button
                    className="mb-5 mt-3 w-full"
                    variant="green"
                    onClick={() => {}}
                  >
                    다시 연습하기
                  </Button>
                </div>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mb-5 flex flex-row">
        {Array.from({ length: formattedQuestions.length }).map((_, index) => (
          <div
            key={index}
            className={`mx-1 size-[6px] rounded-full bg-gray-300 ${
              index === selectedSnap ? 'bg-gray-600' : ''
            }`}
            onClick={() => api && api.scrollTo(index)}
          />
        ))}
      </div>
      <div className="w-full border-t">
        <button
          className="mx-auto flex items-center py-5 text-[15px] font-semibold text-gray-500"
          type="button"
        >
          전체보기
          <ChevronRight className="m-1 -mr-3 size-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default PracticedQuestionCarousel;
