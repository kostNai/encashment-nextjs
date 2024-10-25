import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user?: {
			id: string
			username: string
			is_admin: boolean
		} & DefaultSession['user']
	}
	interface User {
		user?: {
			id: string
			username: string
			is_admin: boolean
		} & DefaultUser['user']
	}
}
declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id: string
		username: string
		is_admin: boolean
	}
}
