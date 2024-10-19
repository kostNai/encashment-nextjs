import LoginForm from '@/components/loginForm/LoginForm'
import styles from './page.module.css'
import Image from 'next/image'

export default function LoginPage() {
	return (
		<section className={styles.container}>
			<LoginForm />
		</section>
	)
}
