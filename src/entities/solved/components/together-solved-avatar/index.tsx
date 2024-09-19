'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInterviewStore } from '@/store/interviewStore';

export const TogetherSolvedAvatar = () => {
  const { currentData } = useInterviewStore();

  const profileImgs = currentData?.profileImgs || [];
  const answerCount = currentData?.answerCount || 0;
  return (
    <div className="relative flex items-center gap-1">
      {profileImgs.length >= 3 ? (
        <>
          {profileImgs.slice(0, 3).map((v, i) => (
            <Avatar key={i} className="relative ml-[-12px] size-[30px]">
              <AvatarImage src={v} alt="프로필 이미지" />
            </Avatar>
          ))}
          <div className="text-xs text-gray-600">
            {answerCount}명이 답변을 남기고 갔어요!
          </div>
        </>
      ) : (
        <div className="flex items-center gap-1">
          <Avatar className="relative ml-[-12px] h-[33px] w-[66px]">
            <AvatarImage src="/images/profile.svg" alt="프로필 이미지" />
          </Avatar>
          <div className="text-xs text-gray-600">
            다른 지원자들과 의견을 나눠보세요.
          </div>
        </div>
      )}
    </div>
  );
};
