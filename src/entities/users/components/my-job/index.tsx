import { HTMLAttributes } from 'react';
import Image from 'next/image';

import { JOB_TYPE } from '@/app/(routes)/archive/create/components/create-archive-form/form-action/select-job-type-button';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/client';

import { useMyForm } from '../../hooks/use-my-form';
interface MyFormProps extends HTMLAttributes<HTMLDivElement> {}

export const MyJob = ({ className, ...props }: MyFormProps) => {
  const { email, jobId } = useUserStore((state) => ({
    email: state.data.email,
    jobId: state.data.job.jobId,
  }));
  const { form, handleJobSubmit } = useMyForm();

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-12',
        className,
      )}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={handleJobSubmit} className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => {
              const isJobChanged =
                JOB_TYPE.indexOf(field.value) + 2 !== (jobId as number);

              return (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-[122px] text-nowrap text-lg font-medium text-gray-500">
                    내 직무
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="h-[58px] w-[449px] rounded-xl border border-gray-200 p-5 text-lg font-medium text-gray-800 data-[state=open]:border data-[state=open]:border-blue-500">
                      <SelectValue
                        placeholder={
                          jobId === 1
                            ? '직무를 선택해주세요.'
                            : JOB_TYPE[jobId - 2]
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {JOB_TYPE.map((job, idx) => {
                          return (
                            <SelectItem
                              value={job}
                              key={idx}
                              className="h-[46px] cursor-pointer text-lg font-medium text-gray-700 hover:bg-gray-50"
                            >
                              {job}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button
                    disabled={!form.watch('job') || !isJobChanged}
                    type="submit"
                  >
                    수정하기
                  </Button>
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
      <div className="ml-[100px] flex w-full items-center justify-start gap-4">
        <Label className="w-[122px] text-nowrap text-lg font-medium text-gray-500">
          로그인 계정
        </Label>
        <div className="relative">
          <input
            className="h-[58px] w-[449px] rounded-xl border border-gray-200 bg-transparent px-5 py-[10px] text-gray-500"
            readOnly
            value={email as string}
          />
          <Image
            className="absolute right-5 top-1/2 -translate-y-1/2"
            alt=""
            height={24}
            src="/images/icons/icon-check-circle.svg"
            width={24}
          />
        </div>
      </div>
    </div>
  );
};
