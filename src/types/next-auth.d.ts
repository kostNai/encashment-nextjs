import { DefaultSession, DefaultUser } from 'next-auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        user?: {
            id: string
            username: string
            is_admin: boolean
            pharmacy_number: number
        } & DefaultSession['user']
    }
    interface User {
        user?: {
            id: string
            username: string
            is_admin: boolean
            pharmacy_number: number
        } & DefaultUser['user']
    }
}
declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        id: string
        username: string
        is_admin: boolean
        pharmacy_number: number
    }
}
