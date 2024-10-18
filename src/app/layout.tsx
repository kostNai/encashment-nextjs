import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { Montserrat } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authConfig } from './api/auth/[...nextauth]/config'
import Contexts from '@/components/contexts/Contexts'

const motserrat = Montserrat({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
	title: 'Encashment',
	description: 'Encashment app'
}
export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authConfig)
	return (
		<html lang="en">
			<body>
				<Contexts session={session}>
					<main className={motserrat.className}>{children}</main>
				</Contexts>
			</body>
		</html>
	)
}
