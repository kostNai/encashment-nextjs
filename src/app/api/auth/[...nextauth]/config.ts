import axios from 'axios'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
export const authConfig: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                const res = await axios
                    .post('http://127.0.0.1:8000/api/login', {
                        ...credentials,
                    })
                    .catch((error) => {
                        throw new Error(error.response.data.message)
                    })
                const user = await res.data

                if (res.status && user) {
                    return user
                }
                return null
            },
        }),
    ],
    callbacks: {
        async signIn() {
            return true
        },

        async redirect({ url, baseUrl }) {
            if (url.startsWith('/')) return `${baseUrl}${url}`
            return baseUrl
        },

        async session({ session, token }) {
            if (token) {
                session!.user!.id = token.id
                session!.user!.is_admin = token.is_admin
                session!.user!.username = token.username
                session!.user!.name = token.name
                session!.user!.pharmacy_number = token.pharmacy_number
            }

            return session
        },

        async jwt({ token, user, trigger }) {
            if (user) {
                token.id = user.user.id
                token.username = user.user.username
                token.is_admin = user.user.is_admin
                token.name = user.user.name
                token.pharmacy_number = user.user.pharmacy_number
                return token
            }

            return token
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 43200,
    },
}
