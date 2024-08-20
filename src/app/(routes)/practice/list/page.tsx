'use server';

import { useParams } from 'next/navigation';

import PracticeList from '@/entities/practice/practice-list';

const Page = async () => {
  return <PracticeList qstate={'all'} />;
};

export default Page;
