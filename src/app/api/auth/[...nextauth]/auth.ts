import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';

import { refreshAction } from '@/entities/auth/actions/refresh-action';
import { signInAction } from '@/entities/auth/actions/sign-in-action';
import { AuthDTO } from '@/entities/auth/types';
import { getUserAction } from '@/entities/users/actions/get-user-action';
import { UserDTO } from '@/entities/users/types';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, Kakao],
  callbacks: {
    jwt: async ({ token, account, trigger, session }) => {
      console.log('account', account);
      if (account) {
        if (account.provider === 'google') {
          if (!account.id_token) {
            throw new Error('Google id_token is undefined');
          }
          const authDTO = await signInAction({
            oauthType: 'GOOGLE',
            token: account.id_token,
          });
          token.auth = authDTO;
          token.accessToken = authDTO.accessToken;
          token.refreshToken = authDTO.refreshToken;
        } else if (account.provider === 'kakao') {
          if (!account.access_token) {
            throw new Error('Kakao access_token is undefined');
          }
          const authDTO = await signInAction({
            oauthType: 'KAKAO',
            token: account.access_token,
          });
          token.auth = authDTO;
          token.accessToken = authDTO.accessToken;
          token.refreshToken = authDTO.refreshToken;
        }
      }

      if (token.auth) {
        const userDTO = await getUserAction({
          userId: token.auth.userId,
          accessToken: token.auth.accessToken,
        });
        token.data = userDTO;

        const currentTime = Math.floor(Date.now() / 1000);
        const tokenExpirationTime = token.exp!;

        if (currentTime > tokenExpirationTime - 60) {
          const refreshedAuth = await refreshAction({
            userId: token.auth.userId,
            refreshToken: token.auth.refreshToken,
          });
          token.auth.accessToken = refreshedAuth.accessToken;
          token.auth.refreshToken = refreshedAuth.refreshToken;
        }
      }

      if (trigger === 'update' && session) {
        if (session.user && token.data) {
          token.data = {
            ...token.data,
            ...session.user.data,
          };
        }
        return token;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token.auth) {
        session.user.auth = token.auth as AuthDTO;
      }
      if (token.data) {
        session.user.data = token.data as UserDTO;
      }

      session.user.auth.accessToken = token.auth.accessToken;
      session.user.auth.refreshToken = token.auth.refreshToken;
      console.log('session', session);

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
});
