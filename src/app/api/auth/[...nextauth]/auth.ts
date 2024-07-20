import NextAuth, { Account, DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Google from 'next-auth/providers/google'

import { signInAction } from '@/entities/auth/actions/sign-in-action'
import { AuthDTO } from '@/entities/auth/types'
import { getUserAction } from '@/entities/users/actions/get-user-action'
import { UserDTO } from '@/entities/users/types'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's postal address. */
      accessToken: string
      account: Account
      auth: AuthDTO
      data: UserDTO
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    auth: AuthDTO
    data: UserDTO
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        if (account.id_token === undefined) {
          throw new Error('id_token is undefined')
        }
        const authDTO = await signInAction({
          oauthType: 'GOOGLE',
          token: account.id_token,
        })
        token.auth = authDTO
      }

      if (token.auth) {
        const userDTO = await getUserAction({
          userId: token.auth.userId,
          accessToken: token.auth.token,
        })
        token.data = userDTO
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
