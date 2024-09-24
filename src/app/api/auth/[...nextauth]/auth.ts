import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { refreshAction } from '@/entities/auth/actions/refresh-action';
import { signInAction } from '@/entities/auth/actions/sign-in-action';
import { getUserAction } from '@/entities/users/actions/get-user-action';

const MAX_REFRESH_ATTEMPTS = 3;
let refreshAttempts = 0;
let isRefreshing = false;

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  if (isRefreshing) {
    throw new Error('Refresh already in progress');
  }

  if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
    console.log('Max refresh attempts reached');
    return { ...token, error: 'MaxRefreshAttemptsReached' };
  }

  isRefreshing = true;
  refreshAttempts++;

  try {
    console.log('Refreshing token...');
    const refreshedAuth = await refreshAction({
      userId: token.auth.userId,
      refreshToken: token.auth.refreshToken,
    });

    const decodedToken = jwtDecode(refreshedAuth.accessToken);
    const newExpirationTime = (decodedToken.exp as number) * 1000;
    console.log(
      'new!!! => ',
      new Date(newExpirationTime as number).toISOString(),
    );

    refreshAttempts = 0;

    return {
      ...token,
      auth: {
        ...token.auth,
        accessToken: refreshedAuth.accessToken,
        refreshToken: refreshedAuth.refreshToken,
      },
      accessToken: refreshedAuth.accessToken,
      refreshToken: refreshedAuth.refreshToken,
      accessTokenExpires: newExpirationTime,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error('Refresh token is invalid or expired');
      return { ...token, error: 'RefreshTokenInvalid' };
    }
    console.error('Error refreshing access token:', error);
    return { ...token, error: 'RefreshAccessTokenError' };
  } finally {
    isRefreshing = false;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, Kakao],
  callbacks: {
    jwt: async ({ token, account, trigger, session }) => {
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
          const decodedToken = jwtDecode(authDTO.accessToken);
          token.accessTokenExpires = (decodedToken.exp as number) * 1000; // 밀리초로 변환
          console.log(
            'Initial token expiration:',
            new Date(token.accessTokenExpires as number).toISOString(),
          );

          return token;
        }
      }

      if (token.auth) {
        refreshAttempts = 0;

        const currentTime = Date.now();
        const tokenExpirationTime = token.accessTokenExpires as number;

        if (
          currentTime > tokenExpirationTime - 60 * 1000 ||
          currentTime > tokenExpirationTime
        ) {
          console.log('Attempting to refresh token');
          try {
            const refreshedToken = await refreshAccessToken(token);
            if (refreshedToken.error) {
              console.error('Token refresh failed:', refreshedToken.error);
              token.error = refreshedToken.error;
            } else {
              token = refreshedToken;
              console.log('Token refreshed successfully');
            }
          } catch (error) {
            console.error('Error during token refresh:', error);
            token.error = 'RefreshError';
          }
        }

        if (!token.error) {
          try {
            const userDTO = await getUserAction({
              userId: token.auth.userId,
              accessToken: token.auth.accessToken,
            });
            token.data = userDTO;
            console.log('User data fetched successfully');
          } catch (error) {
            console.error('Error fetching user data:', error);
            token.error = 'FetchUserError';
          }
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
        session.user.auth = { ...token.auth };
      }
      if (token.data) {
        session.user.data = { ...token.data };
      }
      console.log('diffrent session ', token);
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
