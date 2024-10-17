import LoginForm from '@/components/loginForm/LoginForm'
import styles from './page.module.css'

export default function LoginPage() {
	return (
		<section className={styles.container}>
			<LoginForm />
		</section>
	)
}
