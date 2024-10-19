import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authConfig } from './api/auth/[...nextauth]/config'
import { redirect } from 'next/navigation'

export default async function HomePage() {
	const session = await getServerSession(authConfig)
	return session ? (
		redirect('/profile')
	) : (
		<section className={styles.container}>
			<div className={styles.logo}>
				<Image
					src="/logo.jpg"
					width={800}
					height={500}
					alt="logo"
					className={styles.logoImg}
				/>
			</div>
			<div className={styles.linkContainer}>
				<Link href="/login" className={styles.signinLink}>
					Увійти
				</Link>
			</div>
		</section>
	)
}
