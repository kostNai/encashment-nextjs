import Link from 'next/link'
import styles from './page.module.css'
import Image from 'next/image'

export default function NotFoundPage() {
	return (
		<div className={styles.notFoundContainer}>
			<Image src={'/404.svg'} width={600} height={400} alt="404 image" />
			<h2 className={styles.notFoundTitle}>Вибачте, сторінку не знайдено</h2>
			<Link href={'/'} className={styles.notFoundLink}>
				На головну
			</Link>
		</div>
	)
}
