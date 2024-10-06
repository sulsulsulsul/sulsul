'use client';

import { redirect } from 'next/navigation';

import { Loader } from '@/components/shared/loader';
import { InterviewQuestions } from '@/entities/archives/components/interview-questions';
import { useArchive } from '@/entities/archives/hooks';

import { ArchiveContent } from '../../components/archive-content';

interface ArchiveDetailViewProps {
  id: string;
}

export const ArchiveDetailView = ({ id }: ArchiveDetailViewProps) => {
  if (!id) {
    redirect('/');
  }
  const { archive, isLoading, isError, isSuccess } = useArchive(parseInt(id));

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    throw new Error('Error');
  }
  if (!isSuccess) {
    return null;
  }

  return (
    <main className="flex items-start gap-6">
      <ArchiveContent
        status={archive!.status}
        title={archive!.title}
        resume={archive!.resume}
        companyName={archive!.companyName}
        className="h-full w-[486px]"
      />
      <InterviewQuestions
        data={archive!}
        className="h-full w-[690px]"
        type=""
      />
    </main>
  );
};
