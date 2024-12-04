'use client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

type Props = {
	session: Session | null
	children: ReactNode
}

export default function ContextWrapper({ children, session }: Props) {
	return (
		<SessionProvider session={session}>
			<ToastContainer />
			{children}
		</SessionProvider>
	)
}
