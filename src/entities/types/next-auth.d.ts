import { Account, DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { AuthDTO } from '@/entities/auth/types';
import { UserDTO } from '@/entities/users/types';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's postal address. */
      accessToken: string;
      account: Account;
      auth: AuthDTO;
      data: UserDTO;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    auth: AuthDTO;
    data: UserDTO;
  }
}
