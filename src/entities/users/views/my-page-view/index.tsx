'use client';

import { Separator } from '@radix-ui/react-dropdown-menu';

import { AuthLoading } from '@/components/auth/auth-loading';
import { AuthSignedIn } from '@/components/auth/auth-signed-in';
import { Loader } from '@/components/shared/loader';
import { DropOut } from '@/entities/users/components/drop-out';
import { ProfileImage } from '@/entities/users/components/profile-image';

import { MyForm } from '../../components/my-form';

export const MyPageView = () => {
  return (
    <main>
      <AuthLoading>
        <Loader />
      </AuthLoading>
      <AuthSignedIn>
        <div className="flex items-center justify-center">
          <div className="flex min-w-[792px] flex-col gap-20">
            <ProfileImage />
            <MyForm />
            <Separator className="-mb-10 border" />
            <DropOut />
          </div>
        </div>
      </AuthSignedIn>
    </main>
  );
};
