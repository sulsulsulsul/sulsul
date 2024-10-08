'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { CheckAnimation } from '@/components/lotties/check-animation';
import { TwinkleAnimation } from '@/components/lotties/twinkle-animation';
import { AlertModal } from '@/components/shared/modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { getArchiveDetailAction } from '@/entities/archives/actions';
import { useCreateArchive } from '@/entities/archives/hooks';
import { useCreateQuestion } from '@/entities/questions/hooks/use-create-question';
import { useUpdateJob } from '@/entities/users/hooks/use-update-job';
import { cn } from '@/lib/utils';
import { useArchiveStatusStore } from '@/store/archiveStatus';
import { usePendingStore, useUserStore } from '@/store/client';
import { useCreateQuestionStore } from '@/store/createQuestions';
import { useCurrentArchiveIdStore } from '@/store/currentArchiveId';
import { useResetAvailableStore } from '@/store/resetAvailable';
import { useSampleStore } from '@/store/sampleQuestions';

import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form';

export const JOB_TYPE: string[] = [
  '기획·전략',
  '마케팅·광고·MD',
  '디자인',
  '개발·데이터',
  '총무·법무·사무',
  '회계·세무·재무',
  '인사·노무·HR',
  '영업·판매·무역',
  '고객상담·TM',
  '금융·보험·투자',
  '서비스',
  '의료·제약·바이오',
  '문화·예술·공연',
  '교육',
  '건설·건축',
  '전기·전자·통신',
  '연구·R&D',
  '제조·생산',
  '공공·복지',
] as const;

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));

export const SelectJobTypeModal = () => {
  const [selectedJobType, setSelectedJobType] = useState('');
  const [open, setOpen] = useState(false); //모달 열림 여부
  const [failAlertOpen, setFailAlertOpen] = useState(false); //다시 시도 모달 열림 여부

  const { form } = useCreateArchiveFormContext();
  const { handleSubmit, getValues } = form;

  const { auth, data } = useUserStore();
  const userId = auth.userId;
  const jobId = data.job.jobId;

  const { setStatus } = useArchiveStatusStore();

  const { isPending, setIsPending } = usePendingStore();
  const { isSampleClicked, isSampleWritten, setIsSampleWritten } =
    useSampleStore();
  const { isQuestionCreated, setIsQuestionCreated } = useCreateQuestionStore();
  const { setCurrentId } = useCurrentArchiveIdStore();
  const { setIsResetAvailable } = useResetAvailableStore();

  const queryClient = useQueryClient();
  const { mutate: updateJobMutation } = useUpdateJob();
  const { mutateAsync: createArchiveMutate } = useCreateArchive();
  const { mutateAsync: createQuestionMutate } = useCreateQuestion();

  const isFormValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;

  const router = useRouter();

  const handleSelectedType = (value: string) => {
    setSelectedJobType(value);
  };

  useEffect(() => {}, [isQuestionCreated, failAlertOpen]);

  const onSubmit = async () => {
    setIsPending(true);
    setStatus('PENDING');
    setFailAlertOpen(false);
    wait().then(() => setOpen(false));

    try {
      if (jobId === 1) {
        //jobId update
        const updatedJobId = JOB_TYPE.indexOf(selectedJobType) + 2;
        if (userId) updateJobMutation({ userId, jobId: updatedJobId });
      }

      //create archive
      const newArchiveId = await createArchiveMutate({
        title: getValues('title') || '자소서 제목을 입력해주세요',
        resume: getValues('resume'),
        companyName: getValues('companyName') || '지원하는 기업',
      });
      setCurrentId(newArchiveId);

      //create questions ai
      await createQuestionMutate({ archiveId: newArchiveId });

      // polling function to check status
      const checkStatus = async () => {
        const updatedArchive = await queryClient.fetchQuery({
          queryKey: ['archive', newArchiveId],
          queryFn: () => getArchiveDetailAction(newArchiveId),
        });

        if (updatedArchive && updatedArchive.status === 'COMPLETE') {
          setStatus('COMPLETE');
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.set('status', 'complete');
          router.push(currentUrl.toString());
        } else if (updatedArchive && updatedArchive.status === 'FAIL') {
          setFailAlertOpen(true);
          setStatus('FAIL');
        } else {
          setTimeout(async () => {
            //Invalidate the query to refetch data
            await queryClient.invalidateQueries({
              queryKey: ['archive', newArchiveId],
            });
            checkStatus();
          }, 5000);
        }
      };
      // start polling
      checkStatus();
    } catch (error) {
      setFailAlertOpen(true);
      setIsPending(false);
      setStatus('FAIL');
    }
  };

  const isButtonDisabled = (() => {
    if (
      isPending ||
      isSampleWritten ||
      isQuestionCreated ||
      isSubmitting ||
      (!isFormValid && !isSampleClicked)
    )
      return true;
    return false;
  })();

  const buttonClassName = (() => {
    if (isPending) return 'bg-animated disabled:opacity-100';
    if (isSampleWritten || isQuestionCreated)
      return 'bg-blue-100 text-blue-500 disabled:opacity-100';
    if (isSampleClicked || isFormValid)
      return 'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-100';
    return '';
  })();

  const buttonChildren = useMemo(() => {
    if (isPending)
      return (
        <>
          <TwinkleAnimation className="size-6" />
          <span className="ml-1">예상질문 예측 중</span>
        </>
      );
    else if (isSampleWritten || isQuestionCreated)
      return (
        <>
          <CheckAnimation className="size-6" loop={false} />
          <span className="ml-1">예상질문 예측완료</span>
        </>
      );
    else if (isSampleClicked || isFormValid)
      return (
        <>
          <ActivateTwinkleIcon />
          <span className="ml-1">예상질문 예측하기</span>
        </>
      );
    else
      return (
        <>
          <NonActivateTwinkleIcon />
          <span className="ml-1">예상질문 예측하기</span>
        </>
      );
  }, [
    isPending,
    isSampleWritten,
    isSampleClicked,
    isFormValid,
    isQuestionCreated,
  ]);

  return (
    <>
      <AlertDialog open={failAlertOpen} onOpenChange={setFailAlertOpen}>
        <AlertModal
          className="max-w-[428px] px-[30px] pb-[26px] pt-8"
          onClick={handleSubmit(onSubmit)}
          title="질문 예측 중 오류가 발생했어요"
          desc="다시 시도해 주시거나 문제가 지속될 경우 <br /> 관리자에게 문의해주세요."
          action="다시 시도"
        />
      </AlertDialog>
      {jobId === 1 ? (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isButtonDisabled}
              type="button"
              className={cn(
                'grow border-gray-200 bg-gray-200 text-gray-500',
                buttonClassName,
              )}
              variant="outline"
              onClick={() => {
                isSampleClicked && setIsSampleWritten();
                setFailAlertOpen(false);
                setIsResetAvailable(false);
              }}
            >
              {buttonChildren}
            </Button>
          </AlertDialogTrigger>
          {!isSampleClicked && !failAlertOpen && (
            <AlertDialogContent className="h-auto min-w-fit p-8 pb-6">
              <AlertDialogHeader>
                <AlertDialogTitle className="mt-1">
                  <p className="text-sm text-blue-500">
                    예상질문 정확도 3배 상승!
                  </p>
                  <h1 className="text-3xl font-bold">내 직무를 선택해주세요</h1>
                </AlertDialogTitle>
                <AlertDialogDescription className="mx-auto grid grid-cols-4 gap-3 pt-4">
                  {JOB_TYPE.map((type, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className={cn(
                        'rounded-sm border-gray-300 bg-gray-50 font-normal px-6',
                        selectedJobType === type &&
                          'border-blue-500 bg-white text-blue-500 hover:bg-white',
                      )}
                      onClick={() => handleSelectedType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <hr className="bg-gray-100" />
              <AlertDialogFooter className="mx-auto">
                <AlertDialogCancel className="w-[180px]">
                  취소하기
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={selectedJobType === ''}
                  className="w-[180px] bg-blue-500 text-white disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-100"
                  onClick={handleSubmit(onSubmit)}
                >
                  선택하기
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialog>
      ) : (
        <Button
          disabled={isButtonDisabled}
          type="button"
          className={cn(
            'grow border-gray-200 bg-gray-200 text-gray-500',
            buttonClassName,
          )}
          variant="outline"
          onClick={() => {
            isSampleClicked && setIsSampleWritten();
            handleSubmit(onSubmit)();
            setIsResetAvailable(false);
          }}
        >
          {buttonChildren}
        </Button>
      )}
    </>
  );
};

const NonActivateTwinkleIcon = () => {
  return (
    <Image
      src="/images/icons/icon-Twinkle.svg"
      width={24}
      height={24}
      alt="icon"
    />
  );
};

const ActivateTwinkleIcon = () => {
  return (
    <Image
      src="/images/icons/icon-Twinkle-activate.svg"
      width={24}
      height={24}
      alt="icon"
    />
  );
};

const CompleteCheckIcon = () => {
  return (
    <Image
      src="/images/icons/icon-check.svg"
      width={24}
      height={24}
      alt="icon"
    />
  );
};
