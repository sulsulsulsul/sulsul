'use client'

import { Separator } from '@radix-ui/react-dropdown-menu'
import { Loader } from 'lucide-react'

import { AuthLoading } from '@/components/auth/auth-loading'
import { AuthSignedIn } from '@/components/auth/auth-signed-in'
import { DropOut } from '@/entities/users/components/drop-out'
import { ProfileImage } from '@/entities/users/components/profile-image'

import { MyForm } from '../../components/my-form'

export const MyPageView = () => {
  return (
    <main>
      <AuthLoading>
        <div className="flex h-[80vh] w-full items-center justify-center">
          <Loader />
        </div>
      </AuthLoading>
      <AuthSignedIn>
        <div className="flex items-center justify-center">
          <div className="flex min-w-[792px] flex-col gap-20">
            <ProfileImage />
            <MyForm />
          </div>
        </div>
        <Separator className="mb-8 mt-20" />
        <DropOut />
      </AuthSignedIn>
    </main>
  )
}
