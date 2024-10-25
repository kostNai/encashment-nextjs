'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { RiLoader4Line } from 'react-icons/ri'
import { SlLogout } from 'react-icons/sl'
import styles from './Profile.module.css'

type Props = {
	children: ReactNode
}

export default function Profile({ children }: Props) {
	const session = useSession()
	const pathName = usePathname()
	const user = session.data?.user

	const onLogoutHandler = async () => {
		try {
			const res = await signOut()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={styles.profileWrapper}>
			<div className={styles.profileTitleContainer}>
				<div className={styles.profileTitle}>
					Привіт,
					{session.status === 'authenticated' ? (
						session.data?.user?.username
					) : (
						<RiLoader4Line className={styles.profileIcon} size={24} />
					)}
				</div>
				<button className={styles.logoutBtn} onClick={onLogoutHandler}>
					<SlLogout size={25} color="#fff" className={styles.logoutIcon} />
					<span className={styles.logoutToolTip}>Вихід</span>
				</button>
			</div>
			<div className={styles.profileLinks}>
				<Link
					href="/profile/encashment"
					className={`${styles.profileLink} ${
						pathName === '/profile/encashment' ? styles.active : ''
					}`}
				>
					Зробити винесення
				</Link>
				<Link
					href="/profile/history"
					className={`${styles.profileLink} ${
						pathName === '/profile/history' ? styles.active : ''
					}`}
				>
					Переглянути історію
				</Link>
				<Link
					href="/profile/users"
					className={`${styles.profileLink} ${
						pathName === '/profile/users' ? styles.active : ''
					}`}
				>
					Список користувачів
				</Link>
			</div>
			{children}
		</div>
	)
}
