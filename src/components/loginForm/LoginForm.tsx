import styles from './LoginForm.module.css'

export default function LoginForm() {
	return (
		<form className={styles.loginForm}>
			<h2 className={styles.loginFormTitle}>Вхід</h2>
			<div className={styles.loginFormInputs}>
				<label htmlFor="username" className={styles.loginFormLabel}>
					Логін
					<input
						type="text"
						placeholder="Логін"
						className={styles.loginFormInput}
						name="username"
					/>
				</label>
				<label htmlFor="password" className={styles.loginFormLabel}>
					Пароль
					<input
						type="text"
						placeholder="Пароль"
						className={styles.loginFormInput}
						name="password"
					/>
				</label>
			</div>
			<div className={styles.loginFormBtnContainer}>
				<button className={styles.loginFormBtn}>Увійти</button>
			</div>
		</form>
	)
}
