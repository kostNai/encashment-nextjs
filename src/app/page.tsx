import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
	return (
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
