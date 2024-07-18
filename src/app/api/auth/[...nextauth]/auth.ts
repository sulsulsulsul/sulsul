import { signInAction } from '@/entities/auth/actions/sign-in-action'
import { AuthDTO } from '@/entities/auth/types'
import { getUserAction } from '@/entities/users/actions/get-user-action'
import { UserDTO } from '@/entities/users/types'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Kakao from 'next-auth/providers/kakao'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, Kakao],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        if (account.provider === 'google') {
          if (!account.id_token) {
            throw new Error('Google id_token is undefined')
          }
          const authDTO = await signInAction({
            oauthType: 'GOOGLE',
            token: account.id_token,
          })
          token.auth = authDTO
        } else if (account.provider === 'kakao') {
          if (!account.access_token) {
            throw new Error('Kakao access_token is undefined')
          }
          const authDTO = await signInAction({
            oauthType: 'KAKAO',
            token: account.access_token,
          })
          token.auth = authDTO
        }
      }

      if (token.auth) {
        if (account?.provider === 'google') {
          const userDTO = await getUserAction({
            userId: token.auth.userId,
            accessToken: token.auth.token,
          })
          token.data = userDTO
        } else if (account?.provider === 'kakao') {
          const userDTO = await getUserAction({
            userId: token.auth.userId,
            accessToken: token.auth.token,
          })
          token.data = userDTO
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token.auth) {
        session.user.auth = token.auth as AuthDTO
      }
      if (token.data) {
        session.user.data = token.data as UserDTO
      }

      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
})
