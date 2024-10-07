import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { formatDate } from '@/shared/helpers/date-helpers';
import { Solved } from '@/views/solved';

const Page = async () => {
  const authInfo = await auth();
  const userId = authInfo?.user.auth.userId || 0;
  const accessToken = authInfo?.user.auth.accessToken || '';
  const pivotDate = formatDate({ formatCase: 'YYYY-MM-DD' });

  return <Solved accessToken={accessToken} userId={userId} />;
};
export default Page;
