import { Dispatch, SetStateAction } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import { Switch } from '@/components/ui/swtich';
import { cn } from '@/lib/utils';

interface OptionProp {
  random: CheckedState;
  setRandom: Dispatch<SetStateAction<boolean>>;
  setTimer: Dispatch<SetStateAction<CheckedState>>;
}

export default function PracticeModalOption({
  setRandom,
  setTimer,
  random,
}: OptionProp) {
  return (
    <section className="flex h-[98px] flex-row">
      <div className="flex h-full w-1/2   flex-col justify-center border-y pl-[32px] ">
        <span className="mb-0.5 text-base font-semibold">문제 순서</span>
        <RadioGroup
          defaultValue={'order'}
          onValueChange={(value) => setRandom(value === 'random')}
          className="flex flex-row gap-[46px]"
        >
          <div className="flex items-center justify-items-center space-x-2">
            <RadioGroupItem
              value="order"
              id="option-one"
              autoFocus
              className={cn(
                random ? 'text-gray-600' : 'border-blue-500 text-blue-600',
              )}
            />
            <div className="text-sm font-normal">내 자기소개순서 단위별로</div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="random"
              id="option-two"
              className={
                random ? 'border-blue-500 text-blue-500' : 'text-gray-600'
              }
            />
            <div className="text-sm font-normal">랜덤으로</div>
          </div>
        </RadioGroup>
      </div>
      <div className="flex h-full w-1/2 flex-row items-center justify-between border-y border-y-gray-100 pl-[24px]">
        <div className="flex flex-col">
          <span className="text-base font-semibold">타이머</span>
          <span className="mt-0.5 text-xs text-gray-600">
            화면의 오른쪽 맨 위에서 타이머를 사용할 수 있어요.
          </span>
        </div>
        <Switch
          className="mr-[36px]"
          defaultChecked
          onCheckedChange={(check: CheckedState) => {
            setTimer(check);
          }}
        />
      </div>
    </section>
  );
}
