import Profile from '@/components/profile/Profile'
import React from 'react'
import styles from './page.module.css'

export default function ProfileLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<section className={styles.profileContainer}>
			<Profile>{children}</Profile>
		</section>
	)
}
