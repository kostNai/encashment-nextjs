'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from './Profile.module.css'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type Props = {
	children: ReactNode
}

export default function Profile({ children }: Props) {
	const session = useSession()
	const pathName = usePathname()

	return (
		<div className={styles.profileWrapper}>
			<h2 className={styles.profileTitle}>
				Привіт,{session.data?.user?.username}
			</h2>
			<div className={styles.profileLinks}>
				<Link
					href="/profile/encashment"
					className={`${styles.profileLink} ${
						pathName === '/profile/encashment' ? styles.active : ''
					}`}
				>
					Зробити Винесення
				</Link>
				<Link
					href="/profile/history"
					className={`${styles.profileLink} ${
						pathName === '/profile/history' ? styles.active : ''
					}`}
				>
					Переглянути історію
				</Link>
			</div>
			{children}
		</div>
	)
}
