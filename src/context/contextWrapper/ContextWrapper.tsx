'use client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

type Props = {
	session: Session | null
	children: ReactNode
}

export default function ContextWrapper({ children, session }: Props) {
	return <SessionProvider session={session}>{children}</SessionProvider>
}
