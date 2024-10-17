import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { Montserrat } from 'next/font/google'

const motserrat = Montserrat({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
	title: 'Encashment',
	description: 'Encashment app'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<main className={motserrat.className}>{children}</main>
			</body>
		</html>
	)
}
