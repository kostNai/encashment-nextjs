import axios from 'axios'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authConfig: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {},
				password: {}
			},
			async authorize(credentials, req) {
				const res = await axios.post('http://127.0.0.1:8000/api/login', {
					...credentials
				})
				const user = await res.data
				if (res.status && user) {
					return user
				}
				return null
			}
		})
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true
		},

		async redirect({ url, baseUrl }) {
			return '/profile'
		},

		async session({ session, user, token }) {
			if (token) {
				session!.user!.is_admin = token.is_admin
				session!.user!.username = token.username
				session!.user!.name = token.name
			}

			return session
		},

		async jwt({ token, user, trigger, session }) {
			if (user) {
				token.id = user.user.id
				token.username = user.user.username
				token.is_admin = user.user.is_admin
				token.name = user.user.name
				return token
			}

			return token
		}
	},
	session: {
		strategy: 'jwt'
	}
}
