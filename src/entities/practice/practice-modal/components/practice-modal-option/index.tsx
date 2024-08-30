import { Dispatch, SetStateAction } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import { Switch } from '@/components/ui/swtich';

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
      <div className="flex w-1/2 flex-col justify-center border-y pl-[32px] ">
        <span className="font-semibold">문제 순서</span>
        <RadioGroup
          defaultValue={'order'}
          onValueChange={(value) => setRandom(value === 'random')}
          className="flex flex-row gap-[46px]"
        >
          <div className="flex items-center justify-items-center space-x-2">
            <RadioGroupItem
              value="order"
              id="option-one"
              className={
                random ? 'text-gray-600' : 'border-blue-600 text-blue-600'
              }
            />
            <div>내 자기소개순서 단위별</div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="random"
              id="option-two"
              className={
                random ? 'border-blue-600 text-blue-600' : 'text-gray-600'
              }
            />
            <div>랜덤으로</div>
          </div>
        </RadioGroup>
      </div>
      <div className="flex w-1/2 flex-row items-center justify-between border-y border-y-gray-100 pl-[24px]">
        <div className="flex flex-col">
          <span>타이머</span>
          <span>회면의 오른쪽 맨 위에서 타이머를 사용할수있어요.</span>
        </div>
        <Switch
          className="mr-[36px]"
          onCheckedChange={(check: CheckedState) => {
            setTimer(check);
          }}
        />
      </div>
    </section>
  );
}
