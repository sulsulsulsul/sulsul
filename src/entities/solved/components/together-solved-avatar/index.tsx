'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInterviewStore } from '@/store/interviewStore';

export const TogetherSolvedAvatar = () => {
  const { data } = useInterviewStore();
  return (
    <div className="flex items-center gap-1">
      <div className="relative flex items-center">
        <Avatar className="relative ml-[-12px] size-[30px]">
          <AvatarImage src="/images/suri-profile.svg" alt="프로필 이미지" />
          <AvatarFallback>기본이미지</AvatarFallback>
        </Avatar>
        <Avatar className="relative ml-[-12px] size-[30px]">
          <AvatarImage src="/images/suri-profile.svg" alt="프로필 이미지" />
          <AvatarFallback>기본이미지</AvatarFallback>
        </Avatar>
        <Avatar className="relative ml-[-12px] size-[30px]">
          <AvatarImage src="/images/suri-profile.svg" alt="프로필 이미지" />
          <AvatarFallback>기본이미지</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-xs text-gray-600">
        {data?.answerCount}명이 답변을 남기고 갔어요!
      </div>
    </div>
  );
};
