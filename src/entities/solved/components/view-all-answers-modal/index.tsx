import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SelectContent, SelectValue } from '@radix-ui/react-select';
import dayjs, { Dayjs } from 'dayjs';

import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { getRecentWeeks, removeNewlines } from '@/lib/utils';
import { useUserStore } from '@/store/client';

import { useInterview } from '../../hooks/use-get-interview';
import { useUserAnswer } from '../../hooks/use-get-user-answer';
import { useInterval } from '../../hooks/use-interval';
import { MyAnswerSection } from '../my-answer-section';

export const ViewAllAnswersModal = () => {
  const currentDate = dayjs();
  const [weeks, setWeeks] = useState<
    { label: string; start: string; end: string }[]
  >(getRecentWeeks(currentDate));

  const [filter, setFilter] = useState(weeks[0].label);
  const [selectedDate, setSelectedDate] = useState(weeks[0].end);
  const { data: interviewData } = useInterview(selectedDate);
  const { auth, data } = useUserStore();
  const { userId, accessToken } = auth;

  const { data: myWriteAnswerData } = useUserAnswer({
    interviewId: interviewData?.weeklyInterviewId || 1,
    userId,
    accessToken,
  });

  useInterval(
    () => {
      const newDate = dayjs();
      const newWeeks = getRecentWeeks(newDate);

      setWeeks(newWeeks);
    },
    1000 * 60 * 60 * 24,
  );

  const handleSelectWeek = (label: string) => {
    setFilter(label);
    const selectedWeek = weeks.find((week) => week.label === label);
    if (selectedWeek) {
      setSelectedDate(selectedWeek.end);
    }
  };

  return (
    <main className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800/80">
      <div className="z-50 w-[688px] rounded-md bg-white px-[100px] py-[80px] mobile:h-[464px] mobile:w-[360px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-4">
              <div className="relative flex w-full items-center justify-between">
                <div className="flex h-[30px] w-fit items-center justify-center gap-1 rounded-sm bg-blue-500 px-[12px] py-[6px] text-2xs font-semibold text-white ">
                  <Image
                    src="/images/icons/icon-check-white.svg"
                    alt="참여완료"
                    width={14}
                    height={14}
                  />
                  <p>참여완료</p>
                </div>
                <Select
                  onValueChange={(value) => {
                    handleSelectWeek(value);
                  }}
                >
                  <SelectTrigger className="flex h-full w-[85px] flex-row justify-end p-0 text-black ring-0 focus:ring-0 focus:ring-offset-0">
                    <SelectValue
                      placeholder={weeks[0].label}
                      className="text-right text-sm"
                    />
                  </SelectTrigger>
                  <SelectContent className="absolute left-[340px] top-4 ml-4 h-[253px] w-[135px]">
                    <SelectGroup className="my-2 flex flex-col justify-start rounded-sm border border-gray-200 bg-white py-2 shadow-sm">
                      {weeks.map((v) => (
                        <div key={v.label}>
                          <SelectItem
                            className={`h-[41px] pl-4 text-sm font-semibold ${v.label === filter ? 'bg-muted text-blue-500 hover:!text-blue-500' : 'text-gray-700'}`}
                            value={v.label}
                            onClick={() => setSelectedDate(v.start)}
                          >
                            {v.label}
                          </SelectItem>
                        </div>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <h1 className="text-4xl font-bold">
                {removeNewlines(interviewData?.content || '')}
              </h1>
            </div>
            {myWriteAnswerData ? (
              <MyAnswerSection
                interviewId={interviewData?.weeklyInterviewId || 1}
                myWriteAnswerData={myWriteAnswerData}
                userId={userId}
                pivotDate={selectedDate}
                accessToken={accessToken}
              />
            ) : (
              <></>
            )}
          </div>
          <Image
            src="/images/gift-banner2.svg"
            width={488}
            height={84}
            alt="banner"
          />
        </div>
      </div>
    </main>
  );
};
