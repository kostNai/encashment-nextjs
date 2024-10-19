import Profile from '@/components/profile/Profile'
import React from 'react'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'
import { authConfig } from '../api/auth/[...nextauth]/config'
import { redirect } from 'next/navigation'

export default async function ProfileLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authConfig)
	if (!session) return redirect('/login')

	return (
		<section className={styles.profileContainer}>
			<Profile>{children}</Profile>
		</section>
	)
}
